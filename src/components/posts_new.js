import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/index";

class PostsNew extends Component {
  renderField(field) {
    const { meta:  { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// 'values' contains the form values ('title', 'categories' and 'content') in
// an object.
function validate(values) {
  // If an empty object is returned from this function then Redux Form assumes
  // this is a valid form submittal.
  const errors = {};

  // Validate presence for form values.
  if (!values.title || values.title.length < 3) {
    errors.title = "Please enter a title that is at least 3 characters";
  }
  if (!values.categories) {
    errors.categories = "Please enter post categories";
  }
  if (!values.content) {
    errors.content = "Please enter post content";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "PostNewForm"
})(
  connect(null, { createPost })(PostsNew)
);