

export const FORM_CONFIGURATION: any = {
    'Task-1': [
      {
        title: 'Name',
        type: "text",
        value: "",
        optional: false,
        suggestions: []
      },
      {
        title: 'Gender',
        type: "select",
        value: "",
        optional: false,
        suggestions: ["Male", "Female"]
      },
      {
        title: 'Age',
        type: "number",
        value: "",
        optional: true,
        suggestions: []
      },
      {
        title: 'Pan No',
        type: "text",
        value: "",
        optional: true,
        suggestions: []
      },
    
      {
        title: 'Cibil score',
        type: "number",
        value: "",
        optional: true,
        suggestions: [],
        action:'CHECKCIBIL(750)'
      },
      
      
    ],
    'Task-2' : [
      {
        title: 'Pan number',
        type: "text",
        value: "",
        optional: false,
        suggestions: []
      },
      {
        title: 'Adhaar number',
        type: "text",
        value: "",
        optional: true,
        suggestions: []
      }
    ],

    Start : [
      {
        title: 'Start',
        type: "text",
        value: "",
        optional: false,
        suggestions: []
      },
      {
        title: 'Trigger',
        type: "select",
        value: "",
        optional: true,
        suggestions: ["Automatic","Manual"]
      },
     
    ],
    end : [
      {
        title: 'End',
      },
     
    ],
  };
  