module.exports = {
  $id: "project",
  type: "object",
  description: "Company's initiative with specific operational features and conditions",
  examples: [],
  additionalProperties: true,
  properties: {
    title: {
      type: "string",
      description: "Project's title",
      default: null,
    }
  },
}