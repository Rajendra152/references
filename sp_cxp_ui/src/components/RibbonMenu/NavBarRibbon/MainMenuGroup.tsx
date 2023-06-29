import { INavLinkGroup } from '@fluentui/react/lib/Nav';

export const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: '',
        url: '',
        key: 'back',
        desc: 'Close the Window',
        icon: "Back"
      },
      // {
      //   name: 'Home',
      //   url: '',
      //   key: 'home',
      //   desc: 'Home',
      //   icon: "Home"
      // },
      {
        name: 'New',
        url: '',
        key: 'newKey',
        desc: 'Create the new document',
        icon: 'New',
        subCat: [
          {
            name: 'Notebook',
            url: '',
            key: 'keyNotebook',
            desc: 'Create a new notebook',
            imgSrc: 'Notebook',
          },
          {
            name: 'Worksheet',
            url: '',
            key: 'keyWorksheet',
            desc: 'Add a new worksheet to the current notebook',
            imgSrc: 'WorkSheet',
          },
          // {
          //   name: 'Excel Worksheet',
          //   url: '',
          //   key: 'keyExcelSheet',
          //   desc: 'Add a new excel worksheet to the current notebook',
          //   imgSrc: 'New',
          // },
          {
            name: 'Graph Page',
            url: '',
            key: 'graphPage',
            desc: 'Add a new graph page to the current notebook',
            imgSrc: 'Page',
          },
          {
            name: 'Report',
            url: '',
            key: 'report',
            desc: 'Add a new report to the current notebook',
            imgSrc: 'Report',
          },
          {
            name: 'Transform',
            url: '',
            // disabled: true,
            key: 'transform',
            desc: 'Add a new transform to the current notebook',
            imgSrc: 'UserDefined',
          },
          // {
          //   name: 'Equation',
          //   url: '',
          //   key: 'equation',
          //   desc: 'Add a new equation to the current notebook',
          //   imgSrc: 'PlotEquation',
          // },
          // {
          //   name: 'Macro',
          //   url: '',
          //   key: 'macro',
          //   icon: 'News',
          //   desc: 'Add a new macro to the current notebook',
          //   imgSrc: 'PageSetup',
          // },
          {
            name: 'Section',
            url: '',
            key: 'section',
            icon: 'News',
            desc: 'Add a new section to the current notebook',
            imgSrc: 'Notebook',
          },
        ],
      },
      {
        name: 'Open',
        url: '',
        key: 'open',
        icon: 'Open',
        desc: 'Open an existing document',
      },
      {
        name: 'File Import',
        url: '',
        key: 'keyOpen',
        icon: 'FileImport',
        desc: 'File Import',
        subCat: [
          {
            name: 'File Import',
            url: '',
            key: 'fileimport',
            desc: 'File Import',
            imgSrc: 'FileImport',
            check: true
          },
          {
            name: 'Import Using ODBC',
            url: '',
            key: 'importodbc',
            desc: 'Connect to ODBC Database',
            imgSrc: 'FileImportDB',
          },
          {
            name: 'Import Using JDBC',
            url: '',
            key: 'importjdbc',
            desc: 'Connect to JDBC Database',
            imgSrc: 'FileImportDB',
          },
        ]
      },
      {
        name: 'Export',
        url: '',
        key: 'keyExport',
        icon: 'Database',
        desc: 'Export',
        subCat: [
          {
            name: 'Graph',
            url: '',
            key: 'exportgraph',
            desc: 'Export graph',
            imgSrc: 'File',
          },
          {
            name: 'Report-Text',
            url: '',
            key: 'exporttxt',
            desc: 'Export Report to Txt format',
            imgSrc: 'Database',
          },
          {
            name: 'Report-Word',
            url: '',
            key: 'exportword',
            desc: 'Export Report to Docx format',
            imgSrc: 'Database',
          },
          {
            name: 'Report-PDF',
            url: '',
            key: 'exportpdf',
            desc: 'Export Report to PDF format',
            imgSrc: 'Database',
          },
          {
            name: 'Worksheet',
            url: '',
            key: 'exportworksheet',
            desc: 'Export to a file',
            imgSrc: 'File',
          },
        ]
      },
      {
        name: 'Export Notebook',
        url: '',
        key: 'exportNotebook',
        icon: 'Database',
        desc: 'Export Notebook',
      },
      {
        name: 'Save',
        url: '',
        icon: 'Save',
        desc: 'Save the active document',
        key: 'save',
        automationId: 'saveId'
      },
      {
        name: 'Save As',
        url: '',
        icon: 'SaveAs',
        key: 'saveas',
        desc: 'Save a copy of the document',
        subCat: [
          {
            name: 'SigmaPlot Notebook',
            url: '',
            icon: 'News',
            desc: 'Save the active document as a sigmaPlot notebook',
            key: 'sigmaPlotNotebook',
            imgSrc: 'Notebook',
          },
          // {
          //   name: 'SigmaPlot Template',
          //   url: '',
          //   icon: 'News',
          //   desc: 'Save the active document as a template',
          //   key: 'sigmaPlotTemplate',
          //   imgSrc: 'Notebook',
          // },
          // {
          //   name: 'SigmaPlot Equation Library',
          //   url: '',
          //   icon: 'News',
          //   desc: 'Save the active document as an equationsyys library',
          //   key: 'sigmaPlotEquation',
          //   imgSrc: 'Notebook',
          // },
        ],
      },
      {
        name: 'Save All',
        url: '',
        icon: 'SaveAll',
        key: 'saveall',
        desc: 'Save all documents',
      },
      {
        name: 'Page Setup',
        url: '',
        icon:'PageSetup',
        key: 'pageSet',
        desc: 'Page Setup',
      },
      {
        name: 'Print',
        url: '',
        key:'print',
        icon: 'Print',
        desc: 'Preview and Print the document',
        /* subCat: [
          {
            name: 'Quick Print',
            url: '',
            icon: 'News',
            desc: 'Print one copy of the active document',
            key: 'quickPrint',
            imgSrc: 'Print',
          },
          {
            name: 'Print Preview',
            url: '',
            icon: 'News',
            desc: 'Preview the document before printing',
            key: 'printPreview',
            imgSrc: 'Notebook',
          },
          {
            name: 'Page Setup',
            url: '',
            icon: 'News',
            desc: 'View or modify page setting',
            key: 'pageSetup',
            imgSrc: 'Notebook',
          },
        ], */
      },
      {
        name: 'Password',
        url: '',
        icon: 'Password',
        key: 'password',
        desc: 'Protections',
      },
      {
        name: 'Auditing',
        url: '',
        icon: 'Audit',
        desc: 'Auditing',
        key: 'auditing'
      },
      {
        name: 'Options',
        url: '',
        icon: 'Options',
        desc: 'Options',
        key: 'options'
      },
      {
        name: 'Exit',
        url: '',
        icon: 'Clear',
        key: 'exit',
        desc: 'Exit',
      }
    ],
  },
];
