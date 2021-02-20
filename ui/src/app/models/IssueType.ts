export interface IssueType {
  name: IssueTypeName;
  iconName: "bug_report" | "assignment";
  color: "red" | "green";
}

export const enum IssueTypeName {
  BUG = "BUG",
  TASK = "TASK",
}
