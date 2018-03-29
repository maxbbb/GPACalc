import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";

const { height, width } = Dimensions.get("window");

// course object {hours, grade, name}, only hours is neccessary
// all courses intialized with 0 credits

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGPA: "no classes entered",
      takenCourses: [{ hours: 4, grade: "A", name: "stupid" }],
      currentCourses: [],
      anticipatedCourses: []
    };
  }

  addCourse = (type, course) => {
    if (type == "taken") {
      var newTaken = this.state.takenCourses;
      newTaken.push(course);
    } else if (type == "current") {
      var newCurrent = this.state.currentCourses;
      newCurrent.push(course);
    } else if (type == "anticipated") {
      var newAnticipated = this.state.anticipatedCourses;
      newAnticipated.push(course);
    }
  };

  onChangeHours = (text, index, type) => {
    var newCourse;

    if (type == "taken") {
      var newCourses = this.state.takenCourses;
      newCourse = this.state.takenCourses[index];
      newCourse.hours = text;
      newCourses[index] = newCourse;
      this.setState({ takenCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourse = this.state.currentCourses[index];
      newCourse.hours = text;
      newCourses[index] = newCourse;
      this.setState({ currentCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.hours = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    }
  };

  onChangeGrade = (text, index, type) => {
    var newCourse;

    if (type == "taken") {
      var newCourses = this.state.takenCourses;
      newCourse = this.state.takenCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ takenCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourse = this.state.currentCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ currentCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    }
  };

  onChangeName = (text, index, type) => {
    var newCourse;

    if (type == "taken") {
      var newCourses = this.state.takenCourses;
      newCourse = this.state.takenCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ takenCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourse = this.state.currentCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ currentCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    }
  };

  editCourse = () => {};

  recaculateCurrentGPA = () => {
    var newGPA = 0;
    var creditHours = 0;
    var totalGPA;
    var numberOfCourses = this.state.takenCourses.length;
    this.state.takenCourses.forEach(course => {
      console.log(parseInt(course.hours), "credit hours");
      console.log(this._convertGradeToGPA(course.grade), "grade");
      creditHours += parseInt(course.hours);
      console.log(
        parseInt(course.hours) * this._convertGradeToGPA(course.grade),
        "aklsdjf"
      );
      totalGPA +=
        parseInt(course.hours) * this._convertGradeToGPA(course.grade);
    });
    newGPA = totalGPA / creditHours;
    this.setState({ currentGPA: newGPA });
    console.log(newGPA, "new gpa");
  };

  _convertGradeToGPA = letter => {
    var lowercase = letter.toLowerCase();
    var grade;
    if (lowercase == "a+") {
      grade = 4;
    } else if (lowercase == "a") {
      grade = 4;
    } else if (lowercase == "a-") {
      grade = 3.7;
    } else if (lowercase == "b+") {
      grade = 3.3;
    } else if (lowercase == "b") {
      grade = 3.0;
    } else if ((lowercase = "b-")) {
      grade = 2.7;
    } else if ((lowercase = "c+")) {
      grade = 2.3;
    } else if ((lowercase = "c")) {
      grade = 2;
    } else if ((lowercase = "c-")) {
      grade = 1.7;
    } else if ((lowercase = "d+")) {
      grade = 1.3;
    } else if ((lowercase = "d")) {
      grade = 1;
    } else {
      grade = 0;
    }
    return grade;
  };

  renderTaken = () => {
    return this.state.takenCourses.map((course, index) => {
      return (
        <View style={styles.textFieldContainers}>
          <TextInput
            style={styles.textInput}
            maxLength={1}
            defaultValue={"0"}
            onChangeText={text => this.onChangeHours(text, index, "taken")}
          />
          <TextInput
            style={styles.textInput}
            maxLength={2}
            onChangeText={text => this.onChangeGrade(text, index, "taken")}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onChangeName(text, index, "taken")}
          />
        </View>
      );
    });
  };

  renderCurrent = () => {
    return this.state.currentCourses.map((course, index) => {
      return (
        <View style={styles.textFieldContainers}>
          <TextInput
            style={styles.textInput}
            maxLength={1}
            defaultValue={0}
            onChangeText={text => this.onChangeHours(text, index, "current")}
          />
          <TextInput
            style={styles.textInput}
            maxLength={2}
            onChangeText={text => this.onChangeGrade(text, index, "current")}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onChangeName(text, index, "current")}
          />
        </View>
      );
    });
  };

  renderAnticipated = () => {
    return this.state.currentCourses.map((course, index) => {
      return (
        <View style={styles.textFieldContainers}>
          <TextInput
            style={styles.textInput}
            maxLength={1}
            defaultValue={0}
            onChangeText={text =>
              this.onChangeHours(text, index, "anticipated")
            }
          />
          <TextInput
            style={styles.textInput}
            maxLength={2}
            onChangeText={text =>
              this.onChangeGrade(text, index, "anticipated")
            }
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onChangeName(text, index, "anticipated")}
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.coursesContainer}>
          <Text style={styles.headerText}>Courses</Text>
          <Text style={styles.subHeader}>Taken</Text>
          {this.renderTaken()}
          <Text style={styles.subHeader}>Current</Text>
          {this.renderCurrent()}
          <Text style={styles.subHeader}>Anticipated</Text>
          {this.renderAnticipated()}
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.headerText}>Summary</Text>
          <Text>{"Current GPA" + this.state.currentGPA}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
    flexDirection: "row"
  },
  coursesContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: height,
    width: width / 2
  },
  summaryContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: height,
    width: width / 2
  },
  headerText: {
    fontFamily: "Avenir-Light",
    fontWeight: "bold",
    fontSize: 24
  },
  subHeader: {
    fontFamily: "Avenir-Light",
    fontSize: 20
  },
  textFieldContainers: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black"
  }
});

export default Home;
