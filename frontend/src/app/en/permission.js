import { type } from "os";

const permissionList = {
  admin: {
    title: "admin",
    type: "admin",
    subTypes: [
      {
        name: "Admin",
        subType: "admin",
        permissions: [
          {
            permission: "admin",
            name: "Admin",
            description: "Administrator role with full access and control.",
          },
        ],
      },
    ],
  },
  form: {
    title: "Forms",
    type: "form",
    subtitle: "Grant permission for managing forms.",
    subTypes: [
      {
        name: "Create Form",
        subType: "create_form",
        permissions: [
          {
            permission: "create_forms",
            name: "Create Form",
            description: "Check this option to allow users to create and manage new forms. With this setting enabled, users have full control over form customization and configuration.",
          },
        ],
      },
      {
        name: "Edit Form",
        subType: "edit_form",
        permissions: [
          {
            permission: "edit_all_forms",
            name: "Edit All Form",
            description: "Check this option to allow users to edit permissions for all forms. With this setting enabled, users can modify access levels and configurations for all forms in the system.",
           },
          {
            permission: "edit_own_forms",
            name: "Edit Own Form",
            description: "Check this option to enable users to edit permissions for their own forms. With this setting activated, users can adjust access levels and configurations for forms they created.",
          },
        ],
      },
      {
        name: "Delete form",
        subType: "delete_form",
        permissions: [
          {
            permission: "delete_all_forms",
            name: "Delete All Forms",
            description: "Check this option to permit users to delete all forms. With this setting activated, users can remove forms and their associated configurations from the system.",
          },
          {
            permission: "delete_own_forms",
            name: "Delete Own Forms",
            description: "Check this option to allow users to delete their own forms. With this setting activated, users can remove forms they created, adjusting access levels and configurations as needed.",
          },
          {
            permission: "delete_all_forms_with_associated_submissions",
            name: "Delete All Forms With Associated Submissions",
            description: "Select this option to let users delete all forms and their associated submissions. With this setting enabled, users can modify access levels and configurations for all forms in the system and delete them, including their submissions",
            },
        ],
      },
    ],
  },
  review_form: {
    title: "Review Form",
    type: "review_form",
    subtitle: "Grant Permission For Review Form.",
    subTypes: [
      {
        name: "Review Access",
        subType: "review_access",
        permissions: [
          {
            permission: "access_all_submissions",
            name: "Access All Submissions",
            description: "Check this option to allow users to access all submissions. With this setting enabled, users can view and interact with all submitted data.",
          },
          {
            permission: "access_team_submissions",
            name: "Access Team Submissions",
            description: "Check this option to allow users to access team submissions. With this setting enabled, users can view and interact with submissions made by their team members.",
          },
          {
            permission: "access_own_submissions",
            name: "Access Own Submissions",
            description: "Check this option to allow users to access their own submissions. With this setting enabled, users can view and interact with the data they have submitted.",
          },
        ],
      },
      {
        name: "Elevate Form",
        subType: "elevate_form",
        permissions: [
          {
            permission: "elevate_forms",
            name: "Elevate Forms",
            description: "Check this option to allow users to elevate forms. With this setting enabled, users can promote forms to a higher status or priority within the system.",
           },
        ],
      },
      {
        name: "Access Control",
        subType: "access_control",
        permissions: [
          {
            permission: "change_limited_access_control",
            name: "Change Limited Access Control",
            description: "Check this option to enable users to change limited access control. With this setting enabled, users gain the ability to adjust the level of access control for specific resources or features within the system.",
          },
        ],
      },
      {
        name: "Delete Submission",
        subType: "delete_submission",
        permissions: [
          {
            permission: "delete_all_submissions",
            name: "Delete All Submissions",
            description: "Check this option to allow users to delete all submissions. With this setting enabled, users can remove all submitted data.",
           },
          {
            permission: "delete_own_submissions",
            name: "Delete Own Submissions",
            description: "Check this option to allow users to delete their own submissions. With this setting enabled, users can remove the data they have submitted from the system.",
           },
        ],
      },
      {
        name: "Edit Submission",
        subType: "edit_submission",
        permissions: [
          {
            permission: "edit_all_forms_after_submission",
            name: "Edit All Forms After Submission",
            description: "Check this option to allow users to edit all forms after submission. With this setting enabled, users can modify any form of data even after it has been submitted.",
           },
          {
            permission: "edit_own_forms_after_submission",
            name: "Edit Own Forms After Submission",
            description: "Check this option to allow users to edit their own forms after submission. With this setting enabled, users can modify the data they submitted in their forms.",
           },
        ],
      }
    ],
  },
  form_type: {
    title: "Form Type", 
    type: "form_type",
    subtitle: "Grant Permission For Form Type.",
    subTypes: [
      {
        name: "Create Form Type",
        subType: "create_form_type",
        permissions: [
          {
            permission: "create_form_types",
            name: "Create Form Types",
            description: "Check this option to allow users to create and manage new form types. With this setting activated, users gain full control over customizing and configuring form types.",
          },
        ],
      },
      {
        name: "Edit Form Type",
        subType: "edit_form_type",
        permissions: [
          {
            permission: "edit_all_form_types",
            name: "Edit All Form Types",
            description: "Check this option to allow users to edit form types. With this setting enabled, users gain full control over customizing and configuring form types.",
          },
          {
            permission: "edit_own_form_types",
            name: "Edit Own Form Types",
            description: "Check this option to allow users to edit their own form types. With this setting enabled, users have full control over customizing and configuring the form types they created.",
          },
        ],
      },
      {
        name: "Delete Form Type",
        subType: "delete_form_type",
        permissions: [
          {
            permission: "delete_all_form_types",
            name: "Delete All Form Types",
            description: "Check this option to enable users to delete all form types. With this setting enabled, users can remove all existing form types from the system.",
          },
          {
            permission: "delete_own_form_types",
            name: "Delete Own Form Types",
            description: "Check this option to allow users to delete their own form types. With this setting enabled, users can remove the form types they created.",
          },
        ],
      },
    ],
  },
  action: {
    title: "Action",
    type: "action",
    subtitle: "Grant Permission For Action.",
    subTypes: [
      {
        name: "Delete Action",
        subType: "delete_action",
        permissions: [
          {
            permission: "delete_all_actions",
            name: "Delete All Actions",
            description: "Check this option to enable users to delete all actions. With this setting activated, users can remove all actions from the system.",
          },
          {
            permission: "delete_team_actions",
            name: "Delete Team Actions",
            description: "Check this option to allow users to delete the team’s actions. With this setting enabled, users can remove actions associated with their team.",
          },
        ],
      },
      {
        name: "Reassign Action",
        subType: "reassign_action",
        permissions: [
          {
            permission: "reassign_team_actions",
            name: "Reassign Team Actions",
            description: "Check this option to enable users to reassign team actions. With this setting activated, users gain the ability to transfer ownership of team actions to other team members.",
          },
        ],
      },
    ],
  },
  message_center: {
    title: "Message Center",
    type: "message_center",
    subtitle: "Grant permission for Message Center.",
    subTypes: [
      {
        name: "Create Message",
        subType: "create_message",
        permissions: [
          {
            permission: "create_messages",
            name: "Create Messages",
            description: "Check this option to allow users to create messages. With this setting enabled, users can compose and send messages within the system.",
          },
        ],
      },
      {
        name: "Edit Message",
        subType: "edit_message",
        permissions: [
          {
            permission: "edit_all_messages",
            name: "Edit All Messages",
            description: "Check this option to enable users to edit all messages. With this setting activated, users gain the ability to modify the content of all messages within the system.",
          },
          {
            permission: "edit_own_messages",
            name: "Edit Own Messages",
            description: "Check this option to allow users to edit their own messages. With this setting enabled, users can modify the content of the messages they created.",
          },
        ],
      },
      {
        name: "Delete Message",
        subType: "delete_message",
        permissions: [
          {
            permission: "delete_all_messages",
            name: "Delete All Messages",
            description: "Check this option to enable users to delete all messages. With this setting activated, users gain the ability to remove all messages from the system.",
          },
          {
            permission: "delete_own_messages",
            name: "Delete Own Messages",
            description: "Check this option to allow users to delete their own messages. With this setting enabled, users can remove the messages they created.",
          },
        ],
      },
    ],
  },
  notify: {
    title: "Notify",
    type: "notify",
    subtitle: "Grant Permission For Notify.",
    subTypes: [
      {
        name: "Edit Notify",
        subType: "edit_notify",
        permissions: [
          {
            permission: "edit_notify",
            name: "Edit Notify",
            description: "Check this option to allow users to edit notify. With this setting enabled, users can modify Notify settings.",
          },
        ],
      },
    ],
  },
  file: {
    title: "File",
    type: "file",
    subtitle: "Grant Permission For File.",
    subTypes: [
      {
        name: "Manage File",
        subType: "manage_file",
        permissions: [
          {
            permission: "manage_files",
            name: "Manage Files",
            description: "Check this option to enable users to manage files. With this setting activated, users gain the ability to handle and control files within the system.",
          },
        ],
      },
      {
        name: "File Access",
        subType: "file_access",
        permissions: [
          {
            permission: "access_all_files",
            name: "Access All Files",
            description: "Check this option to allow users access to all files. With this setting enabled, users can view and interact with all files stored within the system.",
          },
        ],
      },
      {
        name: "Delete File",
        subType: "delete_file",
        permissions: [
          {
            permission: "delete_not_acknowledged_files",
            name: "Delete Not Acknowledged Files",
            description: "Check this option to allow users to delete unacknowledged files. With this setting enabled, users can remove files that have not been acknowledged within the system.",
          },
          {
            permission: "delete_acknowledged_files",
            name: "Delete Acknowledged Files",
            description: "Check this option to enable users to delete acknowledged files. With this setting activated, users can remove files that have been acknowledged within the system.",
          },
        ],
      },
    ],
  },
  sds: {
    title: "SDS",
    type: "sds",
    subtitle: "Grant Permission For SDS.",
    subTypes: [
      {
        name: "Manage SDS",
        subType: "manage_sds",
        permissions: [
          {
            permission: "manage_sds",
            name: "Manage SDS",
            description: "Check this option to allow users to manage Safety Data Sheets (SDS). With this setting enabled, users can oversee and control SDS documents within the system.",
          },
        ],
      },
      {
        name: "SDS Access",
        subType: "sds_access",
        permissions: [
          {
            permission: "access_all_sds",
            name: "Access All SDS",
            description: "Check this option to allow users access to all Safety Data Sheets (SDS). With this setting enabled, users can view and interact with all SDS documents stored within the system.",
          },
        ],
      },
      {
        name: "Delete SDS",
        subType: "delete_sds",
        permissions: [
          {
            permission: "sds_not_acknowledged_files",
            name: "SDS Not Acknowledged Files",
            description: "Check this option to allow users to manage Safety Data Sheets (SDS) for files that have not been acknowledged. With this setting enabled, users can handle SDS documents associated with unacknowledged files.",
          },
          {
            permission: "sds_acknowledged_files",
            name: "SDS Acknowledged Files",
            description: "Check this option to enable users to manage Safety Data Sheets (SDS) for acknowledged files. With this setting activated, users can handle SDS documents associated with acknowledged files.",
          },
        ],
      },
    ],
  },
  topic: {
    title: "Topic",
    type: "topic",
    subtitle: "Grant Permission For Topic.",
    subTypes: [
      {
        name: "Create Topic",
        subType: "create_topic",
        permissions: [
          {
            permission: "create_topics",
            name: "Create Topics",
            description: "Check this option to allow users to create topics. With this setting enabled, users can generate new topics within the system.",
          },
        ],
      },
      {
        name: "Edit Topic",
        subType: "edit_topic",
        permissions: [
          {
            permission: "edit_all_topics",
            name: "Edit All Topics",
            description: "Check this option to enable users to edit all topics. With this setting activated, users can modify the content of any topic within the system.",
          },
          {
            permission: "edit_own_topics",
            name: "Edit Own Topics",
            description: "Check this option to allow users to edit their own topics. With this setting enabled, users can modify the content of the topics they created.",
          },
        ],
      },
      {
        name: "Delete Topic",
        subType: "delete_topic",
        permissions: [
          {
            permission: "delete_all_topics",
            name: "Delete All Topics",
            description: "Check this option to enable users to delete all topics. With this setting activated, users can remove all topics from the system.",
          },
          {
            permission: "delete_own_topics",
            name: "Delete Own Topics",
            description: "Check this option to allow users to delete their own topics. With this setting enabled, users can remove the topics they created.",
          },
        ],
      },
      {
        name: "Questions & Answers",
        subType: "questions_answers",
        permissions: [
          {
            permission: "delete_all_questions_answers",
            name: "Delete All Questions & Answers",
            description: "Check this option to delete all questions and answers. With this setting enabled, users gain the ability to remove all questions and their corresponding answers from the topics.",
          },
        ],
      },
    ],
  },
  category: {
    title: "Category",
    type: "category",
    subtitle: "Grant permission for Category.",
    subTypes: [
      {
        name: "Create Category",
        subType: "create_category",
        permissions: [
          {
            permission: "create_categories",
            name: "Create Categories",
            description: "Check this option to allow users to create categories. With this setting enabled, users can generate new categories within the system.",
          },
        ],
      },
      {
        name: "Edit Category",
        subType: "edit_category",
        permissions: [
          {
            permission: "edit_all_categories",
            name: "Edit All Categories",
            description: "Permission to edit all categories.",
          },
          {
            permission: "edit_own_categories",
            name: "Edit Own Categories",
            description: "Check this option to enable users to edit all categories. With this setting activated, users gain the ability to modify any category within the system.",
          },
        ],
      },
      {
        name: "Delete Category",
        subType: "delete_category",
        permissions: [
          {
            permission: "delete_all_categories",
            name: "Delete All Categories",
            description: "Check this option to permit users to delete all categories. With this setting enabled, users have the authority to remove all categories from the system.",
          },
          {
            permission: "delete_own_categories",
            name: "Delete Own Categories",
            description: "Check this option to delete your own categories. With this setting enabled, users can remove the categories they created.",
          },
        ],
      },
    ],
  },
  jsa: {
    title: "JSA",
    type: "jsa",
    subtitle: "Grant permission for JSA.",
    subTypes: [
      {
        name: "Create JSA",
        subType: "create_jsa",
        permissions: [
          {
            permission: "create_jsa",
            name: "Create JSA",
            description: "Select this option to allow users the ability to create Job Safety Analysis (JSA) documents. With this setting enabled, users gain permission to generate comprehensive JSA reports, outlining potential workplace hazards and corresponding safety measures.",
          },
        ],
      },
      {
        name: "JSA Access",
        subType: "jsa_access",
        permissions: [
          {
            permission: "access_all_jsa",
            name: "Access All JSA",
            description: "Enable this option to allow users to access all Job Safety Analysis (JSA) documents. With this setting enabled, users can view and interact with all JSA reports stored within the system.",
          },
        ],
      },
      {
        name: "Edit JSA",
        subType: "edit_jsa",
        permissions: [
          {
            permission: "edit_all_jsa",
            name: "Edit All JSA",
            description: "Check this option to allow users to edit all Job Safety Analysis (JSA) documents. With this setting enabled, users can modify the content of any JSA report within the system.",
          },
          {
            permission: "edit_own_jsa",
            name: "Edit Own JSA",
            description: "Check this option to permit users to edit their own Job Safety Analysis (JSA) documents. With this setting enabled, users can modify the content of the JSA reports they created.",
          },
        ],
      },
      {
        name: "Delete JSA",
        subType: "delete_jsa",
        permissions: [
          {
            permission: "delete_all_jsa",
            name: "Delete All JSA",
            description: "Check this option to allow users to delete all Job Safety Analysis (JSA) documents. With this setting enabled, users can remove all JSA reports from the system.",
          },
          {
            permission: "delete_own_jsa",
            name: "Delete Own JSA",
            description: "Check this option to permit users to delete their own Job Safety Analysis (JSA) documents. With this setting enabled, users can remove the JSA reports they created.",
          },
        ],
      },
      {
        name: "Create Hazard",
        subType: "create_hazard",
        permissions: [
          {
            permission: "create_hazards",
            name: "Create Hazards",
            description: "Check this option to allow users to create hazards. With this setting enabled, users can add new hazard entries to the system.",
          },
        ],
      },
      {
        name: "Edit Hazard",
        subType: "edit_hazard",
        permissions: [
          {
            permission: "edit_all_hazards",
            name: "Edit All Hazards",
            description: "Check this option to allow users to edit all hazard entries. With this setting enabled, users can modify the details of any hazard in the system.",
          },
          {
            permission: "edit_own_hazards",
            name: "Edit Own Hazards",
            description: "Check this option to allow users to edit their own hazard entries. With this setting enabled, users can modify the details of the hazards they created.",
          },
        ],
      },
      {
        name: "Delete Hazard",
        subType: "delete_hazard",
        permissions: [
          {
            permission: "delete_all_hazards",
            name: "Delete All Hazards",
            description: "Check this option to allow users to delete all hazard entries. With this setting enabled, users can remove any hazard from the system.",
          },
          {
            permission: "delete_own_hazards",
            name: "Delete Own Hazards",
            description: "Check this option to allow users to delete their own hazard entries. With this setting enabled, users can remove the hazards they created.",
          },
        ],
      },
    ],
  },
};

export default permissionList;
