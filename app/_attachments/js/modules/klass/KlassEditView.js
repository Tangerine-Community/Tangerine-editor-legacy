var KlassEditView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

KlassEditView = (function(_super) {

  __extends(KlassEditView, _super);

  function KlassEditView() {
    this.renderStudents = __bind(this.renderStudents, this);
    this.registerStudent = __bind(this.registerStudent, this);
    KlassEditView.__super__.constructor.apply(this, arguments);
  }

  KlassEditView.prototype.events = {
    'click .back': 'back',
    'click .save': 'basicInfoSave',
    'click .basic_info_edit': 'basicInfoToggle',
    'click .basic_info_cancel': 'basicInfoToggle',
    'click .add_student': 'addStudentToggle',
    'click .add_student_cancel': 'addStudentToggle',
    'click .add_student_add': 'addStudent',
    'click .register_student': 'registerStudentToggle',
    'click .register_student_cancel': 'registerStudentToggle',
    'click .register_student_save': 'registerStudent'
  };

  KlassEditView.prototype.addStudentToggle = function() {
    return this.$el.find(".add_student_form, .add_student").toggle();
  };

  KlassEditView.prototype.registerStudentToggle = function() {
    this.$el.find(".register_student_form, .register_student").toggle();
    return this.$el.find("#register_student_name ,#register_student_gender, #register_student_age").val("");
  };

  KlassEditView.prototype.addStudent = function() {
    var newStudent, studentId;
    if (this.$el.find("#add_student_select option:selected").val() === "_none") {
      return alert("Please select a student, or cancel.");
    } else {
      studentId = this.$el.find("#add_student_select option:selected").attr("data-id");
      newStudent = this.allStudents.get(studentId);
      newStudent.set({
        klassId: this.klass.id
      });
      newStudent.save();
      this.students.add(newStudent);
      return this.addStudentToggle();
    }
  };

  KlassEditView.prototype.registerStudent = function() {
    this.students.create({
      name: this.$el.find("#register_student_name").val(),
      gender: this.$el.find("#register_student_gender").val(),
      age: this.$el.find("#register_student_age").val(),
      klassId: this.klass.id
    }, {
      wait: true
    });
    this.registerStudentToggle();
    return this.$el.find("#register_student_form input").val();
  };

  KlassEditView.prototype.basicInfoToggle = function() {
    this.$el.find(".basic_info").toggle();
    this.$el.find("#year").val(this.klass.get("year") || "");
    this.$el.find("#grade").val(this.klass.get("grade") || "");
    return this.$el.find("#stream").val(this.klass.get("stream") || "");
  };

  KlassEditView.prototype.basicInfoSave = function() {
    var inputs, newDate;
    inputs = this.$el.find("#startDate").val().split("/");
    newDate = new Date();
    newDate.setFullYear(inputs[0]);
    newDate.setMonth(inputs[1]);
    newDate.setDate(inputs[2]);
    this.klass.set({
      year: this.$el.find("#year").val(),
      grade: this.$el.find("#grade").val(),
      stream: this.$el.find("#stream").val(),
      startTime: newDate.getTime()
    });
    this.klass.save();
    return this.render();
  };

  KlassEditView.prototype.back = function() {
    return window.history.back();
  };

  KlassEditView.prototype.initialize = function(options) {
    this.klass = options.klass;
    this.students = options.students;
    this.allStudents = options.allStudents;
    this.students.on("add remove change", this.renderStudents);
    return this.views = [];
  };

  KlassEditView.prototype.closeViews = function() {
    var view, _i, _len, _ref;
    _ref = this.views;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      view.close();
    }
    return this.views = [];
  };

  KlassEditView.prototype.renderStudents = function() {
    var $ul, double, isInClass, student, studentOptionList, view, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
    $ul = $("<ul>").addClass("student_list");
    this.closeViews();
    _ref = this.students.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      student = _ref[_i];
      view = new StudentListElementView({
        student: student,
        students: this.students
      });
      this.views.push(view);
      view.render();
      view.on("change", this.renderStudents);
      $ul.append(view.el);
    }
    this.$el.find("#student_list_wrapper").html($ul);
    studentOptionList = "<option value='_none' disabled='disabled' selected='selected'>(Name) - (Age)</option>";
    _ref2 = this.allStudents.models;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      student = _ref2[_j];
      isInClass = false;
      _ref3 = this.students.models;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        double = _ref3[_k];
        if (double.id === student.id) isInClass = true;
      }
      if (!isInClass) {
        studentOptionList += "<option data-id='" + student.id + "'>" + (student.get('name')) + " - " + (student.get('age')) + "</option>";
      }
    }
    return this.$el.find("#add_student_select").html(studentOptionList);
  };

  KlassEditView.prototype.render = function() {
    var grade, startDate, stream, year;
    year = this.klass.get("year") || "";
    grade = this.klass.get("grade") || "";
    stream = this.klass.get("stream") || "";
    startDate = new Date(parseInt(this.klass.get("startDate")));
    this.$el.html("    <button class='back navigation'>Back</button>    <h1>Class Editor</h1>    <h2>Basic info</h2>    <table class='info_box basic_info'>      <tr><td><label for='year'>Year</label></td><td>" + year + "</td></tr>      <tr><td><label for='grade'>Grade</label></td><td>" + grade + "</td></tr>      <tr><td><label for='stream'>Stream</label></td><td>" + stream + "</td></tr>      <tr><td><label for='start_time'>Start date</label></td><td>" + (startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate()) + "</td></tr>      <tr><td colspan='2'><button class='basic_info_edit command'>Edit</button></td></tr>    </table>    <div class='basic_info confirmation'>      <div class='menu_box'>        <div class='label_value'>          <label for='year'>Year</label>          <input id='year' value='" + year + "'>        </div>        <div class='label_value'>          <label for='grade'>Grade</label>          <input id='grade' value='" + grade + "'>        </div>        <div class='label_value'>          <label for='stream'>Stream</label>          <input id='stream' value='" + stream + "'>        </div>        <div class='label_value'>          <label for='start_date'>Start</label>          <input id='startDate' value='" + (startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate()) + "'>        </div>              <button class='save command'>Save</button> <button class='basic_info_cancel command'>Cancel</button>      </div>    </div>        <h2>Students</h2>    <div id='student_list_wrapper'></div>    <button class='add_student command'>Add student</button>    <div class='add_student_form menu_box confirmation'>      <div class='label_value'>        <label for='add_student_select'>Select a student</label>        <select id='add_student_select'>        </select>      </div>            <button class='add_student_add command'>Add</button><button class='add_student_cancel command'>Cancel</button>    </div>    <button class='register_student command'>Register students</button>    <div class='register_student_form menu_box confirmation'>      <h2>Register New Student</h2>      <div class='label_value'>        <label for='register_student_name'>Name</label>        <input id='register_student_name' value=''>      </div>      <div class='label_value'>        <label for='register_student_gender'>Gender</label>        <input id='register_student_gender' value=''>      </div>      <div class='label_value'>        <label for='register_student_age'>Age</label>        <input id='register_student_age' value=''>      </div>      <button class='register_student_save command'>Save</button>      <button class='register_student_cancel command'>Cancel</button>    </div>    ");
    this.renderStudents();
    return this.trigger("rendered");
  };

  return KlassEditView;

})(Backbone.View);