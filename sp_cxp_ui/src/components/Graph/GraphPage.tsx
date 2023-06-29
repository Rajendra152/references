import React from 'react'

interface GraphPage{
    id   : number
    name : string
    data : GraphPageObject[]
}

interface GraphPageObject{
    id      : number
    type    : GraphPageObjectType
    x       : number
    y       : number
    width   : number
    height  : number

}