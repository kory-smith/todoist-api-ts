export interface TodoistProject {
  /** Project id */
  id: number;
  /** Project name */
  name: string;
  /** One of 20 colors denoted by a code. See https://developer.todoist.com/guides/#colors for more details */
  color: TodoistColor
  /**
   * Project order
   * (Project position in the list of projects)
   */
  readonly order: number;
  /** Value from 1 to 4 for the Project indentation level */
  readonly indent: 1 | 2 | 3 | 4;
  /** Number of project comments */
  comment_count: number;
  /** Whether the project is shared */
  readonly shared: Boolean;
  /** Whether the project is a favorite */
  favorite: Boolean;
  /** Identifier to find the match between different copies of shared projects. Read more at:
   * https://developer.todoist.com/rest/v1/#projects
  */
  sync_id: number;
  /** URL to access this project in the Todoist web or mobile applications. */
  url: string;

  /** ID of parent project, if one exists. */
  readonly parent_id?: number;
  /** Whether the project is the Inbox or not. */
  readonly inbox_project?: true;
  /** Whether the project is the TeamInbox or not. */
  readonly team_inbox?: true;
}

type TodoistColor =
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50;

export interface TodoistSection {
  /** Section Id */
  id: number;
  /** Id of the project the section belongs to */
  project_id: number
  /** Section position among other sections from the same project */
  order: number
  /** Section name */
  name: string;
}

export interface TodoistComment {
  /** Comment Id */
  id: number;
  /** Comment’s task id (for task comments). */
  task_id?: number;
  /** Comment’s project id (for project comments) */
  project_id?: number;
  /** Date and time when comment was added, RFC3339 format in UTC */
  posted: string;
  /** Comment content */
  content: string;
  /** Attachment file */
  attachment?: Attachment;
}

export interface Attachment {
  /** the name of the file */
  file_name: string;
  /** The size of the file in bytes */
  file_size: number;
  /** MIME type (i.e. text/plain, image/png) */
  file_type: string;
  /**
   * The URL where the file is located (a string value representing an HTTP URL).
   * Note that we don’t cache the remote content on our servers and stream or expose files directly from third party resources.
   * In particular this means that you should avoid providing links to non-encrypted (plain HTTP) resources,
   * as exposing this files in Todoist may issue a browser warning.
   */
  file_url: string;
  /** Upload completion state */
  upload_state: "pending" | "completed";
}

export interface TodoistLabel {
  /** Label id */
  id: number;
  /** Label name */
  name: string;
  color: TodoistColor;
  /** Number used by clients to sort list of labels */
  order: number;
  /** Boolean indicating whether or not label is favorited */
  favorite: boolean;
}

export type Due = {
  /** Human defined date in arbitrary format */
  string: string;
  /** Date in format YYYY-MM-DD corrected to user’s timezone */
  date: string;
  recurring: boolean;
  /**
   * Only returned if exact due time set
   * (i.e. it’s not a whole-day task),
   * date and time in RFC3339 format in UTC
   */
  datetime?: string;
  /**
   * only returned if exact due time set.
   * user’s timezone definition either in tzdata-compatible  format (“Europe/Berlin”)
   * or as a string specifying east of UTC offset as “UTC±HH:MM”
   * (i.e. “UTC-01:00”)
   */
  timezone?: string;
};

export interface TodoistTask {
  /** Task id */
  id: number;
  /** Task's project id */
  readonly project_id: number;
  /** Task's section id */
  section_id: number;
  /** Task content */
  content: string;
  /** Task description */
  description: string;
  /** ID of parent task. Absent for top-level tasks. */
  parent_id?: number;
  /** Task description */
  priority: 1 | 2 | 3 | 4;
  /** Flag to mark completed tasks */
  completed: boolean;
  /** Array of label ids, associated with a task */
  label_ids: number[];
  /** Position in the project */
  readonly order: number;
  /** object representing task due date/time */
  due: Due;
  /** URL to access this task in Todoist web interface */
  url: string;
  /** Number of task comments */
  comment_count: number;
  /** The responsible user ID (if set, and only for shared tasks). */
  assignee?: number;
  /** The ID of the user who assigned the task. 0 if the task is unassigned. */
  assigner?: number;
}

export type GetTaskParameters = {
  /** Filter tasks by project id */
  project_id?: number;
  /** Filter tasks by section id */
  section_id?: number;
  /** Filter tasks by label */
  label_id?: number;
  /** Filter by any supported filter */
  filter?: string;
  /**
   * IETF language tag defining what language filter is written in,
   * if it differs from default English
   */
  lang?: string;
  ids?: number[];
};

/** Please note that only one of the due_* fields can be used at the same time (due_lang is a special case). */
export type UpdateTaskParameters = {
  /** Task content */
  content: string;
  description: string;
  /** Ids of labels associated with the task */
  label_ids?: number[];
  /** Task priority from 1 (normal) to 4 (urgent) */
  priority?: 1 | 2 | 3 | 4;
  /**
   * human-defined task due date
   * (ex.: “next Monday”, “Tomorrow”).
   * Value is set using local (not UTC) time.
   */
  due_string?: string;
  /** Specific date in YYYY-MM-DD format relative to user’s timezone */
  due_date?: string;
  /** specific date and time in RFC3339 format in UTC */
  due_datetime?: string;
  /** 2-letter code specifying language in case due_string is not written in English */
  due_lang?: string;
  assignee?: number;
};

export type CreateTaskParameters = {
  /** Task content */
  content: string;
  description?: string
  /** Task project id. If not set, task is put to user’s Inbox */
  project_id?: number;
  section_id?: number;
  parent_id?: number;
  /** Non-zero integer value used by clients to sort tasks inside project */
  order?: number;
  /** Ids of labels associated with the task */
  label_ids?: number[];
  /** Task priority from 1 (normal) to 4 (urgent) */
  priority?: number;
  /**
   * human-defined task due date
   * (ex.: “next Monday”, “Tomorrow”).
   * Value is set using local (not UTC) time.
   */
  due_string?: string;
  /** Specific date in YYYY-MM-DD format relative to user’s timezone */
  due_date?: string;
  /** specific date and time in RFC3339 format in UTC */
  due_datetime?: string;
  /** 2-letter code specifying language in case due_string is not written in English */
  due_lang?: string;
  assignee?: number
};


export type StrInt = string | number;
