

export const FORM_CONFIGURATION: any = {
    Task: [
      {
        title: 'First Name',
        type: "text",
        value: "",
        optional: false,
        suggestions: []
      },
      {
        title: 'Last Name',
        type: "text",
        value: "",
        optional: true,
        suggestions: []
      },
      {
        title: 'Gender',
        type: "select",
        value: "",
        optional: false,
        suggestions: ["Male", "Female"]
      },
    ],
    Decision : [
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
  };
  