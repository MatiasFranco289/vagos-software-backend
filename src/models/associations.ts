//Note: there has to be a better way to import all models to this file
import Blog from "./Blog";
import BlogTag from "./BlogTag";
import Comment from "./Comment";
import Project from "./Project";
import ProjectState from "./ProjectState";
import ProjectTag from "./ProjectTag";
import Role from "./Role";
import User from "./User";
import UserState from "./UserState";

const createAssociations = async () => {
  //Blog N <--- 1 User
  User.hasMany(Blog, {
    foreignKey: "creator_id",
  });
  Blog.belongsTo(User, {
    foreignKey: "creator_id",
  });

  //Blog N <--- 1 Project
  Project.hasMany(Blog, {
    foreignKey: "project_id",
  });
  Blog.belongsTo(Project, {
    foreignKey: "project_id",
  });

  //Blog N <---> N BlogTag
  Blog.belongsToMany(BlogTag, { through: "blog_to_blog_tag" });
  BlogTag.belongsToMany(Blog, { through: "blog_to_blog_tag" });

  //Comment N <--- 1 Blog
  Blog.hasMany(Comment, {
    foreignKey: "blog_id",
  });
  Comment.belongsTo(Blog, {
    foreignKey: "blog_id",
  });

  //Comment N <--- 1 User
  User.hasMany(Comment, {
    foreignKey: "user_id",
  });
  Comment.belongsTo(User, {
    foreignKey: "user_id",
  });

  //This is for comments that respond to other comments
  //Comment N <--- 1 Comment
  Comment.hasMany(Comment, {
    foreignKey: "parent_id",
  });
  Comment.belongsTo(Comment, {
    foreignKey: "parent_id",
  });

  //Project N <--- 1 User
  User.hasMany(Project, {
    foreignKey: "creator_id",
  });
  Project.belongsTo(User, {
    foreignKey: "creator_id",
  });

  //Project N <--- 1 ProjectState
  ProjectState.hasMany(Project, {
    foreignKey: "state_id",
  });
  Project.belongsTo(ProjectState, {
    foreignKey: "state_id",
  });

  //Project N <---> N ProjectTag
  Project.belongsToMany(ProjectTag, { through: "project_to_project_tag" });
  ProjectTag.belongsToMany(Project, { through: "project_to_project_tag" });

  //User N <--- 1 Role
  Role.hasMany(User, {
    foreignKey: "role_id",
  });
  User.belongsTo(Role, {
    foreignKey: "role_id",
  });

  //User N <--- 1 UserState
  UserState.hasMany(User, {
    foreignKey: "state_id",
  });
  User.belongsTo(UserState, {
    foreignKey: "state_id",
  });
};

export default createAssociations;
