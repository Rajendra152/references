import React from 'react'
import './DBCanvas.scss'
import { isFunction, isNil, isArray, find } from 'lodash'
import * as d3 from 'd3'
import { ZoomBehavior, ZoomTransform } from 'd3'

const canvasDefaults = {
	graphSize: 100000,
	gridDotSize: 3,
	gridDotOffset: 75,
	gridDotColor: 'lightgray',
	graphMinZoom: 0.15,
	graphMaxZoom: 1.5,
	nodeBoundary: 40,
	graphZoomDuration: 500,
}

export interface DbCanvasItemLinkProps {
	targetTableId: string
	targetAttrIndex: number
	sourceTableId: string
	sourceAttrIndex: number
	[key: string]: any
}

export interface DbCanvasItemProps {
	id: string
	x: number
	y: number
	width: number
	height: number
	links: DbCanvasItemLinkProps[]
	[key: string]: any
}

export interface DbCanvasProps {
	transform?: ZoomTransform
	list: DbCanvasItemProps[]
	selected?: string | null
	positionCenterToRef: number | null
	getLinkTooltip?: (link: DbCanvasItemLinkProps) => string
	getLineIcon?: (
		link: DbCanvasItemLinkProps,
		x: number,
		y: number
	) => React.ReactNode
	getIsLinkSelected?: (item: DbCanvasItemLinkProps) => boolean
	onRenderItem?: (item: DbCanvasItemProps, i: number) => React.ReactNode
	onTransform?: (transform: ZoomTransform) => void
	onSelectNode: (item: DbCanvasItemProps) => void
	onSelectLink: (link: DbCanvasItemLinkProps) => void
	onReposition: (item: DbCanvasItemProps, newX: number, newY: number) => void
	onCanvasClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
	onDeleteKeyDown?: () => void
}

export interface DbCanvasState {
	selectedNode: DbCanvasItemProps | null | undefined
}

export class DbCanvas extends React.Component<DbCanvasProps, DbCanvasState> {
	transform: ZoomTransform
	zoom: ZoomBehavior<SVGGElement, any>
	viewContainer: HTMLDivElement | null = null
	svg: SVGGElement | null = null
	entities: SVGGElement | null = null
	view: SVGGElement | null = null
	constructor(props: DbCanvasProps) {
		super(props)
		this.transform = isNil(props.transform) ? d3.zoomIdentity : props.transform
		this.state = {
			selectedNode: null,
		}
		this.zoom = d3
			.zoom<SVGGElement, any>()
			.scaleExtent([canvasDefaults.graphMinZoom, canvasDefaults.graphMaxZoom])
		this.handleItemSelect = this.handleItemSelect.bind(this)
		this.handleItemDragStart = this.handleItemDragStart.bind(this)
		this.handleItemDrag = this.handleItemDrag.bind(this)
		this.handleItemDragEnd = this.handleItemDragEnd.bind(this)
		this.handleStartTransform = this.handleStartTransform.bind(this)
		this.handleSetTransform = this.handleSetTransform.bind(this)
		this.handleZoomEnd = this.handleZoomEnd.bind(this)
		this.handleSetZoom = this.handleSetZoom.bind(this)
		this.handleCanvasClick = this.handleCanvasClick.bind(this)
		this.handleSelectLink = this.handleSelectLink.bind(this)
		this.handleBodyKeyUp = this.handleBodyKeyUp.bind(this)
	}

	componentDidMount() {
		this.bindGraphEventListeners()
		this.bindItemRepositionEvents()
		document.body.addEventListener('keyup', this.handleBodyKeyUp)
	}

	componentDidUpdate(prevProps: DbCanvasProps) {
		this.bindGraphEventListeners()
		this.bindItemRepositionEvents()
		if (
			!isNil(this.props.positionCenterToRef) &&
			this.props.positionCenterToRef !== prevProps.positionCenterToRef
		) {
			this.centerTheCanvasWithRespectToElement()
		}
	}

	componentWillUnmount() {
		document.body.removeEventListener('keyup', this.handleBodyKeyUp)
	}

	centerTheCanvasWithRespectToElement() {
		if (isNil(this.props.positionCenterToRef)) {
			return null
		}
		const id = this.props.list[this.props.positionCenterToRef].id
		const parent = d3.select(this.viewContainer).node()
		const entities = d3.select('[id="' + id + '"]').node()
		if (!isNil(parent) && !isNil(entities)) {
			const width = parent.clientWidth
			const height = parent.clientHeight
			const viewBBox = this.props.list[this.props.positionCenterToRef]
			const translate = [this.transform.x, this.transform.y]
			const next = { x: translate[0], y: translate[1], k: this.transform.k }
			if (viewBBox.width > 0 && viewBBox.height > 0) {
				const dx = viewBBox.width
				const dy = viewBBox.height
				const x = viewBBox.x + viewBBox.width / 2
				const y = viewBBox.y + viewBBox.height / 2
				next.k = 0.9 / Math.max(dx / width, dy / height)
				if (next.k < canvasDefaults.graphMinZoom) {
					next.k = canvasDefaults.graphMinZoom
				} else if (next.k > canvasDefaults.graphMaxZoom) {
					next.k = canvasDefaults.graphMaxZoom
				}
				next.x = width / 2 - next.k * x
				next.y = height / 2 - next.k * y
			} else {
				next.k = (canvasDefaults.graphMinZoom + canvasDefaults.graphMaxZoom) / 2
				next.x = 0
				next.y = 0
			}
			const t = d3.zoomIdentity.translate(next.x, next.y).scale(next.k)
			d3.select(this.svg)
				.transition()
				.duration(canvasDefaults.graphZoomDuration)
				.call(this.zoom.transform as any, t)
		}
	}

	bindGraphEventListeners() {
		d3.select(this.svg).call(this.zoom as any)

		this.zoom.on('start', this.handleStartTransform)
		this.zoom.on('zoom', this.handleSetTransform)
		this.zoom.on('end', this.handleZoomEnd)
	}

	bindItemRepositionEvents() {
		const entities = d3.select(this.entities)
		const list = entities.selectAll('.ITEM_REF')
		list
			// .on('click', this.handleItemMouseDown)
			.call(
				d3
					.drag()
					.on('start', this.handleItemDragStart)
					.on('drag', this.handleItemDrag)
					.on('end', this.handleItemDragEnd) as any
			)
	}

	buildSubData() {
		const arrivals: {
			[id: string]: {
				list: string[]
				idToTypeMap: {}
				topList: string[]
				bottomList: string[]
			}
		} = {}
		const ref: { [id: string]: DbCanvasItemProps } = {}
		const getItemForId = (id: string) => {
			return ref[id]
		}
		const getArrivalsListForId = (id: string) => {
			return arrivals[id].list
		}

		const getTargetXY = (sourceId: string, targetId: string) => {
			const arrival = arrivals[targetId]
			const targetItem = getItemForId(targetId)
			const arrivalsGap = targetItem.height / (arrival.list.length + 1)

			const topIndex = arrival.topList.indexOf(sourceId)
			if (topIndex !== -1) {
				const topGap =
					canvasDefaults.nodeBoundary / (arrival.topList.length + 1)
				return {
					x: targetItem.x - topGap * (topIndex + 1),
					y: targetItem.y + arrivalsGap * (topIndex + 1),
				}
			}
			const bottomIndex = arrival.bottomList.indexOf(sourceId)
			const bottomGap =
				canvasDefaults.nodeBoundary / (arrival.bottomList.length + 1)
			return {
				x:
					targetItem.x -
					bottomGap * (arrival.bottomList.length - bottomIndex + 1),
				y:
					targetItem.y +
					arrivalsGap * (bottomIndex + arrival.topList.length + 1),
			}
		}

		const list = isArray(this.props.list) ? this.props.list : []
		for (let i = 0, iLen = list.length; i < iLen; i++) {
			const item = list[i]
			const dependencies = isArray(item.links) ? item.links : []
			ref[item.id] = item
			for (let j = 0, jLen = dependencies.length; j < jLen; j++) {
				if (isNil(arrivals[dependencies[j].targetTableId])) {
					arrivals[dependencies[j].targetTableId] = {
						list: [],
						idToTypeMap: {},
						topList: [],
						bottomList: [],
					}
				}
				arrivals[dependencies[j].targetTableId].list.push(item.id)
			}
		}

		for (const id in arrivals) {
			if (!isNil(arrivals[id])) {
				const targetItem = getItemForId(id)
				const items = arrivals[id].list
				for (let i = 0, iLen = items.length; i < iLen; i++) {
					const sourceItem = getItemForId(items[i])
					if (
						sourceItem.y + sourceItem.height / 2 <
						targetItem.y + targetItem.height / 2
					) {
						// towards top
						arrivals[id].topList.push(sourceItem.id)
					} else {
						// towards bottom
						arrivals[id].bottomList.push(sourceItem.id)
					}
				}
			}
		}

		return { getItemForId, getArrivalsListForId, getTargetXY }
	}

	buildDependentsFlow(
		sourceItem: DbCanvasItemProps,
		getTargetXY: (
			sourceId: string,
			targetId: string
		) => {
			x: number
			y: number
		}
	) {
		const data: {
			idToTypeMap: { [id: string]: string }
			bottomRight: number
			bottomLeft: number
			topRight: number
			topLeft: number
			orderedList: DbCanvasItemLinkProps[]
		} = {
			idToTypeMap: {},
			bottomRight: 0,
			bottomLeft: 0,
			topRight: 0,
			topLeft: 0,
			orderedList: [],
		}
		const bottomRight = []
		const bottomLeft = []
		const topRight = []
		const topLeft = []
		const dependencies = isArray(sourceItem.links) ? sourceItem.links : []
		for (let i = 0, iLen = dependencies.length; i < iLen; i++) {
			const targetItem = getTargetXY(
				sourceItem.id,
				dependencies[i].targetTableId
			)
			if (sourceItem.y + sourceItem.height / 2 < targetItem.y) {
				// target item towards bottom
				if (sourceItem.x + sourceItem.width <= targetItem.x) {
					// target item towards right
					data.idToTypeMap[dependencies[i].targetTableId] = 'BOTTOM_RIGHT'
					bottomRight.push(dependencies[i])
					data.bottomRight++
				} else {
					// target item towards left
					data.idToTypeMap[dependencies[i].targetTableId] = 'BOTTOM_LEFT'
					bottomLeft.push(dependencies[i])
					data.bottomLeft++
				}
			} else {
				// target item towards top
				if (sourceItem.x + sourceItem.width <= targetItem.x) {
					// target item towards right
					data.idToTypeMap[dependencies[i].targetTableId] = 'TOP_RIGHT'
					topRight.push(dependencies[i])
					data.topRight++
				} else {
					// target item towards left
					data.idToTypeMap[dependencies[i].targetTableId] = 'TOP_LEFT'
					topLeft.push(dependencies[i])
					data.topLeft++
				}
			}
		}
		topRight.sort((a, b) => {
			const aTarget = getTargetXY(sourceItem.id, a.targetTableId)
			const bTarget = getTargetXY(sourceItem.id, b.targetTableId)
			return aTarget.x > bTarget.x ? -1 : 1
		})
		bottomRight.sort((a, b) => {
			const aTarget = getTargetXY(sourceItem.id, a.targetTableId)
			const bTarget = getTargetXY(sourceItem.id, b.targetTableId)
			return aTarget.x > bTarget.x ? -1 : 1
		})
		topLeft.sort((a, b) => {
			const aTarget = getTargetXY(sourceItem.id, a.targetTableId)
			const bTarget = getTargetXY(sourceItem.id, b.targetTableId)
			return aTarget.x < bTarget.x ? -1 : 1
		})
		bottomLeft.sort((a, b) => {
			const aTarget = getTargetXY(sourceItem.id, a.targetTableId)
			const bTarget = getTargetXY(sourceItem.id, b.targetTableId)
			return aTarget.x < bTarget.x ? -1 : 1
		})
		data.orderedList = topLeft.concat(topRight, bottomRight, bottomLeft)
		return data
	}

	getLines() {
		const linesList = []
		const subDataFunctions = this.buildSubData()
		const list = isArray(this.props.list) ? this.props.list : []
		for (let i = 0, iLen = list.length; i < iLen; i++) {
			const sourceItem = list[i]
			const dependenciesData = this.buildDependentsFlow(
				sourceItem,
				subDataFunctions.getTargetXY
			)
			const dependencies = dependenciesData.orderedList
			const gap = sourceItem.height / (dependencies.length + 1)
			const topGap =
				canvasDefaults.nodeBoundary /
				(dependenciesData.topLeft + dependenciesData.topRight + 1)
			const bottomGap =
				canvasDefaults.nodeBoundary /
				(dependenciesData.bottomLeft + dependenciesData.bottomRight + 1)
			const bottomRightGap =
				canvasDefaults.nodeBoundary / (dependenciesData.bottomRight + 1)
			const bottomLeftGap =
				canvasDefaults.nodeBoundary / (dependenciesData.bottomLeft + 1)
			const topRightGap =
				canvasDefaults.nodeBoundary / (dependenciesData.topRight + 1)
			const topLeftGap =
				canvasDefaults.nodeBoundary / (dependenciesData.topLeft + 1)
			let topCount = 0
			let bottomCount = 0
			let bottomRightCount = 0
			let bottomLeftCount = 0
			let topRightCount = 0
			let topLeftCount = 0
			for (let j = 0, jLen = dependencies.length; j < jLen; j++) {
				let path = ''
				const targetItem = subDataFunctions.getItemForId(
					dependencies[j].targetTableId
				)
				const targetXY = subDataFunctions.getTargetXY(
					list[i].id,
					dependencies[j].targetTableId
				)
				const targetX = targetXY.x
				const targetY = targetXY.y

				// source start line
				let xGap = 0
				const type = dependenciesData.idToTypeMap[dependencies[j].targetTableId]
				if (type === 'TOP_RIGHT' || type === 'TOP_LEFT') {
					xGap = topGap * (topCount + 1)
					topCount++
				} else {
					xGap =
						bottomGap *
						(dependenciesData.bottomLeft +
							dependenciesData.bottomRight -
							bottomCount +
							1)
					bottomCount++
				}
				const ySource = sourceItem.y + gap * (j + 1)
				let x1 = sourceItem.x + sourceItem.width
				const y1 = ySource
				const iconPositionX = x1
				const iconPositionY = y1
				const x2 = sourceItem.x + sourceItem.width + xGap
				let y2 = ySource
				path += 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' '

				x1 = x2
				switch (type) {
					case 'TOP_RIGHT':
						y2 = sourceItem.y - topRightGap * (topRightCount + 1)
						if (targetY <= y1 && y2 <= targetY) {
							y2 = targetY
						}
						topRightCount++
						break
					case 'TOP_LEFT':
						y2 = sourceItem.y - topLeftGap * (topLeftCount + 1)
						topLeftCount++
						break
					case 'BOTTOM_LEFT':
						y2 =
							sourceItem.y +
							sourceItem.height +
							bottomLeftGap * (bottomLeftCount + 1)
						bottomLeftCount++
						break
					case 'BOTTOM_RIGHT':
						y2 =
							sourceItem.y +
							sourceItem.height +
							bottomRightGap * (bottomRightCount + 1)
						if (targetY >= y1 && y2 >= targetY) {
							y2 = targetY
						}
						bottomRightCount++
						break
					default:
				}
				path += 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' '

				if (y2 === targetY) {
					path += 'M' + x2 + ' ' + y2 + ' L' + targetX + ' ' + targetY + ' '
				} else {
					path += 'M' + x2 + ' ' + y2 + ' L' + targetX + ' ' + y2 + ' '
					path +=
						'M' + targetX + ' ' + targetY + ' L' + targetX + ' ' + y2 + ' '
				}

				// destination end line
				path +=
					'M' +
					targetItem.x +
					' ' +
					targetY +
					' L' +
					targetX +
					' ' +
					targetY +
					'Z'

				linesList.push({
					data: dependencies[j],
					iconPositionX,
					iconPositionY,
					path,
				})
			}
		}
		return linesList
	}

	getRenderRectangleContent(item: DbCanvasItemProps, i: number) {
		if (isFunction(this.props.onRenderItem)) {
			return this.props.onRenderItem(item, i)
		}
		return null
	}

	getLinkTooltip(data: DbCanvasItemLinkProps) {
		if (isFunction(this.props.getLinkTooltip)) {
			return this.props.getLinkTooltip(data)
		}
		return null
	}

	getLineIcon(data: DbCanvasItemLinkProps, x: number, y: number) {
		if (isFunction(this.props.getLineIcon)) {
			return this.props.getLineIcon(data, x, y)
		}
		return null
	}

	getIsLineSelected(data: DbCanvasItemLinkProps) {
		if (isFunction(this.props.getIsLinkSelected)) {
			return this.props.getIsLinkSelected(data)
		}
		return false
	}

	handleBodyKeyUp(e: KeyboardEvent) {
		if (!isNil(e.target) && (e.target as any).tagName === 'BODY') {
			switch (e.keyCode) {
				case 8:
				case 46: {
					e.stopPropagation()
					e.preventDefault()
					if (isFunction(this.props.onDeleteKeyDown)) {
						this.props.onDeleteKeyDown()
					}
					break
				}
				default:
			}
		}
	}

	handleItemSelect(
		e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		item: DbCanvasItemProps
	) {
		e.stopPropagation()
		e.preventDefault()
		if (isFunction(this.props.onSelectNode)) {
			this.props.onSelectNode(item)
		}
	}

	handleSelectLink(
		e: React.MouseEvent<SVGPathElement, MouseEvent>,
		data: DbCanvasItemLinkProps
	) {
		e.stopPropagation()
		e.preventDefault()
		if (isFunction(this.props.onSelectLink)) {
			this.props.onSelectLink(data)
		}
	}

	handleItemDragStart() {
		const id = d3.event.sourceEvent.currentTarget.getAttribute('id')
		this.setState({
			selectedNode: find(this.props.list, (d) => d.id === id),
		})
	}

	handleItemDrag() {
		if (!isNil(this.state.selectedNode)) {
			this.setState({
				selectedNode: {
					...this.state.selectedNode,
					x: this.state.selectedNode.x + d3.event.dx,
					y: this.state.selectedNode.y + d3.event.dy,
				},
			})
		}
	}

	handleItemDragEnd() {
		const node = this.state.selectedNode
		if (!isNil(node) && isFunction(this.props.onReposition)) {
			const itemInList = find(this.props.list, (d) => d.id === node.id)
			if (
				!isNil(itemInList) &&
				itemInList.x !== node.x &&
				itemInList.y !== node.y
			) {
				this.props.onReposition(node, node.x, node.y)
			}
		}
		this.setState({
			selectedNode: null,
		})
	}

	handleStartTransform() {
		if (
			d3.event.transform.x !== this.transform.x &&
			d3.event.transform.y !== this.transform.y
		) {
			this.handleSetZoom(this.transform.k, this.transform.x, this.transform.y)
		}
	}

	handleSetTransform() {
		this.transform = d3.event.transform
		d3.select(this.view).attr('transform', d3.event.transform.toString())
	}

	handleZoomEnd() {
		if (isFunction(this.props.onTransform)) {
			this.props.onTransform(this.transform)
		}
	}

	handleSetZoom(k = 1, x = 0, y = 0) {
		const t = d3.zoomIdentity.translate(x, y).scale(k)
		d3.select(this.svg).call(this.zoom.transform as any, t)
	}

	handleCanvasClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (isFunction(this.props.onCanvasClick)) {
			this.props.onCanvasClick(event)
		}
	}

	renderGraphDefinitions() {
		return (
			<defs data-radium='true'>
				<pattern
					id='grid'
					key='grid'
					width={canvasDefaults.gridDotOffset}
					height={canvasDefaults.gridDotOffset}
					patternUnits='userSpaceOnUse'
				>
					<circle
						cx={canvasDefaults.gridDotOffset / 2}
						cy={canvasDefaults.gridDotOffset / 2}
						r={canvasDefaults.gridDotSize}
						fill={canvasDefaults.gridDotColor}
					/>
				</pattern>
			</defs>
		)
	}

	renderGraphBackground() {
		return (
			<rect
				x={-canvasDefaults.graphSize / 4}
				y={-canvasDefaults.graphSize / 4}
				width={canvasDefaults.graphSize}
				height={canvasDefaults.graphSize}
				fill='url(#grid)'
			/>
		)
	}

	renderItem(item: DbCanvasItemProps, i: number) {
		return (
			<svg
				key={item.id}
				id={item.id}
				width={item.width + 'px'}
				height={item.height + 'px'}
				x={item.x + 'px'}
				y={item.y + 'px'}
				className='ITEM_REF'
				onClick={(e) => this.handleItemSelect(e, item)}
			>
				<rect
					width={item.width + 'px'}
					height={item.height + 'px'}
					x={'0px'}
					y={'0px'}
					className='DbCanvasItemRect'
				/>
				{this.getRenderRectangleContent(item, i)}
			</svg>
		)
	}

	renderItems() {
		const children = []
		const list = isArray(this.props.list) ? this.props.list : []
		let selectedNode = null
		for (let i = 0, iLen = list.length; i < iLen; i++) {
			let item = list[i]
			if (
				!isNil(this.state.selectedNode) &&
				this.state.selectedNode.id === item.id
			) {
				item = this.state.selectedNode
			}
			if (this.props.selected === item.id) {
				selectedNode = this.renderItem(item, i)
			} else {
				children.push(this.renderItem(item, i))
			}
		}
		if (!isNil(selectedNode)) {
			children.push(selectedNode)
		}
		return children
	}

	renderLines() {
		if (!isNil(this.state.selectedNode)) {
			return null
		}
		const lines = this.getLines()
		return lines.map((item) => {
			const data = item.data
			const key =
				data.targetTableId +
				'_' +
				data.sourceTableId +
				'_' +
				data.sourceAttrIndex
			return (
				<g key={key}>
					{this.getLineIcon(item.data, item.iconPositionX, item.iconPositionY)}
					<path
						d={item.path}
						onClick={(e) => this.handleSelectLink(e, item.data)}
						className={
							'DbCanvasLine LINE_REF ' +
							(this.getIsLineSelected(item.data) ? 'DbCanvasLineSelected' : '')
						}
					>
						<title>{this.getLinkTooltip(data)}</title>
					</path>
				</g>
			)
		})
	}

	render() {
		return (
			<div
				className='DbCanvasContainer'
				ref={(el) => (this.viewContainer = el)}
				onClick={this.handleCanvasClick}
			>
				<svg className='DbCanvasSVGContainer' ref={(el) => (this.svg = el)}>
					{this.renderGraphDefinitions()}
					<g ref={(el) => (this.view = el)}>
						{this.renderGraphBackground()}
						<g>{this.renderLines()}</g>
						<g ref={(el) => (this.entities = el)}>{this.renderItems()}</g>
					</g>
				</svg>
			</div>
		)
	}
}
