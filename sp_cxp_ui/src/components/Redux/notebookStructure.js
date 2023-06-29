let notebookStructure = {

  // All Notebooks Structure
  notebooks: {
    byId: {
      notebook1: {
        id: 'notebook1',
        name: 'Notebook1',
        sections: ['section1-1', 'section2-1'],
      },

      notebook2: {
        id: 'notebook2',
        name: 'Notebook2',
        sections: ['section1-2', 'section2-2'],
      },
    },

    allNotebooksId: ['notebook1', 'notebook2'],
  },

  // All Section Structure
  sections: {
    byId: {
      'section1-1': {
        id: 'section1-1',
        notebookId: 'notebook1',
        worksheetId: "worksheet1",
        graphPages: ['graphPage-section11-1'],
        reports: [],
        parrentSectionId: null,
        subSections: [],
      },

      'section2-1': {
        id: 'section2-1',
        notebookId: 'notebook1',
        graphPages: [],
        reports: [],
        parrentSectionId: null,
        subSections: [],
      },

      'section1-2': {
        id: 'section1-2',
        notebookId: 'notebook2',
        graphPages: [],
        reports: [],
        parrentSectionId: null,
        subSections: [],
      },

      'section2-2': {
        id: 'section2-2',
        notebookId: 'notebook2',
        graphPages: [],
        reports: [],
        parrentSectionId: null,
        subSections: [],
      },
    },
    allSectionsId: [
      'section1-1',
      'section2-1',
      'section1-2',
      'section2-2',
      'section1-1-1',
    ],

    allSectionId: {
      "notebook1": ["", "", ""],
      "notebook2": ["", "", ""]
    }
  },

  //All Worksheets Record
  worksheets: {
    byId: {
      id: "worksheet1",
      name: "Data1",
      notebook: "notebook1",
      section: "section1",
      subsection: null,
    },

    allWorksheetId: ["worksheet1", "worksheet2"]

  },

  //All GraphPages Structure
  graphPages: {
    byId: {
      graphpage1: {
        id: 'graphpage1',
        name: 'GraphPage1',
        notbookId: 'notebook1',
        sectionId: 'section1',
        subsectionId: null,
        graphs: ['graph1'],
      },

      graphpage2: {
        id: 'graphpage2',
        name: 'GraphPage2',
        graphs: ['graph2'],
      },
    },

    allPagesId: [],

    //All Graphs inside GraphPages

    graphs: {
      byId: {
        graph1: {
          id: 'graph1',
          name: 'Graph1',
          notbookId: 'notebook1',
          sectionId: 'section1',
          subsectionId: null,
          graphPageId: 'graphpage1',
        },

        graph2: {
          id: 'graph2',
          name: 'Graph2',
          notbookId: 'notebook1',
          sectionId: 'section1',
          subsectionId: null,
          graphPageId: 'graphpage1',
        },
      },

      allGraphsId: ['graph1', 'graph2'],
    },
  },

  //All Reports Details

  reports: {
    byId: {
      report1: {
        id: 'report1',
        name: 'Report1',
        notbookId: 'notebook1',
        sectionId: 'section1',
        subsectionId: null,
      },

      report2: {
        id: 'report2',
        name: 'Report2',
        notbookId: 'notebook1',
        sectionId: 'section1',
        subsectionId: null,
      },
    },

    allReportsId : ["report1", "report2"]
  },

  // All Active Items
  allActiveItem: {
    notebook: "",
    section: "",
    subsection: "",
    worksheet: "",
    graphpage: {
      id: "",
      objectId: ""
    },
    report: "",
    selectedPivotItem: ""
  }

};
