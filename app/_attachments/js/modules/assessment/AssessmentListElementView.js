// Generated by CoffeeScript 1.4.0
var AssessmentListElementView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssessmentListElementView = (function(_super) {

  __extends(AssessmentListElementView, _super);

  function AssessmentListElementView() {
    this.assessmentDelete = __bind(this.assessmentDelete, this);

    this.updateResultCount = __bind(this.updateResultCount, this);
    return AssessmentListElementView.__super__.constructor.apply(this, arguments);
  }

  AssessmentListElementView.prototype.className = "AssessmentListElementView";

  AssessmentListElementView.prototype.tagName = "li";

  AssessmentListElementView.prototype.events = {
    'click .assessment_menu_toggle': 'assessmentMenuToggle',
    'click .admin_name': 'assessmentMenuToggle',
    'click .assessment_delete': 'assessmentDeleteToggle',
    'click .assessment_delete_cancel': 'assessmentDeleteToggle',
    'click .assessment_delete_confirm': 'assessmentDelete',
    'click .copy': 'copyTo',
    'click .duplicate': 'duplicate',
    'click .archive': 'archive',
    'click .update': 'update',
    'click .print': 'togglePrint',
    'change #print_format': 'print'
  };

  AssessmentListElementView.prototype.blankResultCount = "-";

  AssessmentListElementView.prototype.initialize = function(options) {
    this.model = options.model;
    this.parent = options.parent;
    return this.isAdmin = Tangerine.user.isAdmin();
  };

  AssessmentListElementView.prototype.duplicate = function() {
    var newName,
      _this = this;
    newName = "Copy of " + this.model.get("name");
    return this.model.duplicate({
      name: newName
    }, null, null, function(assessment) {
      return _this.model.trigger("new", assessment);
    });
  };

  AssessmentListElementView.prototype.copyTo = function(group) {
    var _this = this;
    return this.model.replicate(group, function() {
      return window.location = Tangerine.settings.urlIndex(group, "assessments");
    });
  };

  AssessmentListElementView.prototype.update = function() {
    var _this = this;
    this.model.updateFromServer();
    return this.model.on("status", function(message) {
      if (message === "import success") {
        return Utils.midAlert("Updated");
      } else if (message === "import error") {
        return Utils.midAlert("Update failed");
      }
    });
  };

  AssessmentListElementView.prototype.togglePrint = function() {
    return this.$el.find(".print_format_wrapper").fadeToggle(150);
  };

  AssessmentListElementView.prototype.print = function() {
    var format,
      _this = this;
    format = this.$el.find("#print_format option:selected").attr("data-format");
    if (format === "cancel") {
      this.$el.find(".print_format_wrapper").fadeToggle(150, function() {
        return _this.$el.find("#print_format").val("reset");
      });
      return;
    }
    return Tangerine.router.navigate("print/" + this.model.id + "/" + format, true);
  };

  AssessmentListElementView.prototype.updateResultCount = function() {};

  AssessmentListElementView.prototype.archive = function() {
    var result;
    result = this.$el.find(".archive :selected").val() === "true";
    if (result === true) {
      this.$el.find(".admin_name").addClass("archived_assessment");
    } else {
      this.$el.find(".admin_name").removeClass("archived_assessment");
    }
    this.model.save({
      archived: result
    });
    return true;
  };

  AssessmentListElementView.prototype.assessmentMenuToggle = function() {
    this.$el.find('.assessment_menu_toggle').toggleClass('icon_down');
    return this.$el.find('.assessment_menu').fadeToggle(250);
  };

  AssessmentListElementView.prototype.assessmentDeleteToggle = function() {
    this.$el.find(".assessment_delete_confirm").fadeToggle(250);
    return false;
  };

  AssessmentListElementView.prototype.assessmentDelete = function() {
    return this.model.destroy();
  };

  AssessmentListElementView.prototype.render = function() {
    var adminName, adminResultCount, archiveClass, archiveSwitch, copyButton, deleteButton, deleteConfirm, downloadKey, duplicateButton, editButton, format, html, isArchived, name, printButton, printButtons, printSelector, resultCount, resultsButton, runButton, selected, toggleButton, updateButton;
    isArchived = this.model.getBoolean('archived');
    if (!this.isAdmin && isArchived && Tangerine.settings.get("context") === "mobile") {
      return;
    }
    toggleButton = "<span class='assessment_menu_toggle icon_ryte'> </span>";
    name = "<span class='name clickable '>" + (this.model.get('name')) + "</span>";
    adminName = "<span class='admin_name clickable " + archiveClass + "'>" + (this.model.get('name')) + "</span>";
    adminResultCount = "<label class='result_count small_grey no_help' title='Result count. Click to update.'>Results <b>" + this.resultCount + "</b></label>";
    resultCount = "<span class='result_count no_help'>Results <b>" + this.resultCount + "</b></span>";
    archiveClass = isArchived ? " archived_assessment" : "";
    selected = " selected='selected'";
    editButton = "<a href='#edit/" + this.model.id + "'><img class='link_icon edit' title='Edit' src='images/icon_edit.png'></a>";
    runButton = "<a href='#run/" + this.model.id + "'><img class='link_icon run' title='Run' src='images/icon_run.png'></a>";
    resultsButton = "<a href='#results/" + this.model.id + "'><img class='link_icon results' title='Results' src='images/icon_results.png'></a>";
    printButton = "<img class='link_icon print' title='Print' src='images/icon_print.png'> ";
    printButtons = "      <a href='#print/" + this.model.id + "/content'><img class='link_icon print' title='Print' src='images/icon_print.png'></a>      <a href='#print/" + this.model.id + "/stimuli'><img class='link_icon print' title='Print' src='images/icon_print.png'></a>      <a href='#print/" + this.model.id + "/backup'><img class='link_icon print' title='Print' src='images/icon_print.png'></a>    ";
    printSelector = "      <div class='print_format_wrapper confirmation'>        <select id='print_format'>        <option disabled='disabled' selected='selected' value='reset'>Select a print format</option>        " + ((function() {
      var _i, _len, _ref, _results;
      _ref = Tangerine.settings.config.get("printFormats");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        format = _ref[_i];
        _results.push("<option data-format='" + format.key + "'>" + format.name + "</option>");
      }
      return _results;
    })()) + "        <option data-format='cancel'>Cancel</option>        </select>      </div>    ";
    copyButton = "<img class='link_icon copy' title='Copy to' src='images/icon_copy_to.png'>";
    deleteButton = "<img class='assessment_delete link_icon' title='Delete' src='images/icon_delete.png'>";
    deleteConfirm = "<span class='assessment_delete_confirm'><div class='menu_box'>Confirm <button class='assessment_delete_yes command_red'>Delete</button> <button class='assessment_delete_cancel command'>Cancel</button></div></span>";
    duplicateButton = "<img class='link_icon duplicate' title='Duplicate' src='images/icon_duplicate.png'>";
    updateButton = "<img class='link_icon update' title='Update' src='images/icon_sync.png'>";
    downloadKey = "<span class='download_key small_grey'>Download key <b>" + (this.model.id.substr(-5, 5)) + "</b></span>";
    archiveSwitch = "    <select class='archive'>      <option value='false' " + (isArchived ? selected : '') + ">Active</option>      <option value='true'  " + (isArchived ? selected : '') + ">Archived</option>    </select>    ";
    if (this.isAdmin) {
      html = "        <div>          " + toggleButton + "          " + adminName + "        </div>      ";
      if (Tangerine.settings.get("context") === "mobile") {
        html += "          <div class='assessment_menu'>            " + runButton + "            " + resultsButton + "            " + updateButton + "            " + deleteButton + "            " + deleteConfirm + "            " + printButton + "            " + printSelector + "          </div>        ";
      } else {
        html += "          <div class='assessment_menu'>            " + runButton + "            " + resultsButton + "            " + editButton + "            " + printButton + "            " + duplicateButton + "            " + deleteButton + "            " + downloadKey + "            " + deleteConfirm + "            " + printSelector + "          </div>        ";
      }
    } else {
      html = "<div>" + runButton + name + " " + resultsButton + "</div>";
    }
    this.$el.html(html);
    return this.trigger("rendered");
  };

  return AssessmentListElementView;

})(Backbone.View);
