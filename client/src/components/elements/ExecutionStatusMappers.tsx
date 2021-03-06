import {PresetStatusColorType} from "antd/lib/_util/colors";
import {ExecutionStatus} from "../../common/ExecutionStatus";

export function getTextFromExecutionStatus(executionStatus: ExecutionStatus): string {
  switch (executionStatus) {
    case (ExecutionStatus.Finished):
      return "Finished";
    case (ExecutionStatus.Processing):
      return "Processing";
    case (ExecutionStatus.NotRunning):
      return "Not running";
    case (ExecutionStatus.Aborted):
      return "Aborted";
    default:
      return "Error";
  }
}

export function getBadgeFromExecutionStatus(executionStatus: ExecutionStatus): PresetStatusColorType {
  switch (executionStatus) {
    case (ExecutionStatus.Finished):
      return "success";
    case (ExecutionStatus.Processing):
      return "warning";
    case (ExecutionStatus.NotRunning):
      return "default";
    case (ExecutionStatus.Aborted):
      return "error";
    default:
      return "default";
  }
}

export function generateId(): string {
  return `f${(+new Date()).toString(16)}`;
}

export const executionStatuses = Object.keys(ExecutionStatus)
  .slice(0, Object.values(ExecutionStatus).length / 2).map((key) => Number(key)).filter(s=> {return s!==4;});
