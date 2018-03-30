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

import plus from "./PlusButton.png";
import minus from "./minus-sign.jpg";
import refresh from "./refresh-icon.png";

import Snackbar from "material-ui/Snackbar";

const { height, width } = Dimensions.get("window");

// course object {hours, grade, name}, only hours is neccessary
// all courses intialized with 0 credits

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGPA: "No classes entered",
      takenCourses: [],
      currentCourses: [],
      anticipatedCourses: [],
      requiredGPA: "No target GPA entered",
      requiredToHighSnack: false,
      totalCreditHours: 0
    };
  }

  addCourse = type => {
    var course = { hours: 0, grade: null, name: null };
    if (type == "taken") {
      var newTaken = this.state.takenCourses;
      newTaken.push(course);
      this.setState({ takenCourses: newTaken });
    } else if (type == "current") {
      var newCurrent = this.state.currentCourses;
      newCurrent.push(course);
      this.setState({ currentCourses: newCurrent });
    } else if (type == "anticipated") {
      var newAnticipated = this.state.anticipatedCourses;
      newAnticipated.push(course);
      console.log(newAnticipated);
      this.setState({ anticipatedCourses: newAnticipated });
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
        if (newCourse.grade && newCourse.hours && newCourse) {
          this.recaculateCurrentGPA();
        }
      });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourse = this.state.currentCourses[index];
      newCourse.hours = text;
      newCourses[index] = newCourse;
      this.setState({ currentCourses: newCourses });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.hours = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses });
    }
  };

  onChangeGrade = (text, index, type) => {
    var newCourse;
    console.log(text, "ongradechange");
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
      this.setState({ currentCourses: newCourses });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses });
    }
  };

  onChangeName = (text, index, type) => {
    var newCourse;

    if (type == "taken") {
      var newCourses = this.state.takenCourses;
      newCourse = this.state.takenCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ takenCourses: newCourses });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourse = this.state.currentCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ currentCourses: newCourses });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourse = this.state.anticipatedCourses[index];
      newCourse.grade = text;
      newCourses[index] = newCourse;
      this.setState({ anticipatedCourses: newCourses });
    }
  };

  deleteCourse = (index, type) => {
    if (type == "taken") {
      var newCourses = this.state.takenCourses;
      newCourses.splice(index, 1);
      this.setState({ takenCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "current") {
      var newCourses = this.state.currentCourses;
      newCourses.splice(index, 1);
      this.setState({ currentCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    } else if (type == "anticipated") {
      var newCourses = this.state.anticipatedCourses;
      newCourses.splice(index, 1);
      this.setState({ anticipatedCourses: newCourses }, () => {
        this.recaculateCurrentGPA();
      });
    }
  };

  recaculateCurrentGPA = () => {
    var newGPA = 0;
    var creditHours = 0;
    var totalGPA = 0;
    var numberOfCourses = this.state.takenCourses.length;
    this.state.takenCourses.forEach(course => {
      if (course.hours && course.grade) {
        creditHours += parseInt(course.hours);
        totalGPA +=
          parseInt(course.hours) * this._convertGradeToGPA(course.grade);
      }
    });
    newGPA = totalGPA / creditHours;
    this.setState({ currentGPA: newGPA, totalCreditHours: creditHours }, () => {
      this.calculateTargetGPA(this.state.requiredGPA);
    });
    console.log(newGPA, "new gpa");
  };

  _convertGradeToGPA = letter => {
    var lowercase = letter.toLowerCase();
    console.log(lowercase, letter);
    var grade;
    if (lowercase === "a+") {
      grade = 4;
    } else if (lowercase === "a") {
      grade = 4;
    } else if (lowercase === "a-") {
      grade = 3.7;
    } else if (lowercase === "b+") {
      grade = 3.3;
    } else if (lowercase === "b") {
      grade = 3.0;
    } else if (lowercase == "b-") {
      grade = 2.7;
    } else if (lowercase == "c+") {
      grade = 2.3;
    } else if (lowercase == "c") {
      grade = 2;
    } else if (lowercase == "c-") {
      grade = 1.7;
    } else if (lowercase == "d+") {
      grade = 1.3;
    } else if (lowercase == "d") {
      grade = 1;
    } else {
      grade = 0;
    }
    console.log(grade, "grade");
    return grade;
  };

  calculateTargetGPA = gpa => {
    var desiredGPA = parseFloat(gpa);
    console.log(desiredGPA, gpa);
    if (desiredGPA) {
      var totalNonGradedCredits = 0;
      var totalTakenHours = parseInt(this.state.totalCreditHours);
      var currentGPA = parseFloat(this.state.currentGPA);

      this.state.currentCourses.forEach(course => {
        if (course.grade == "" || course.grade == null) {
          totalNonGradedCredits += parseInt(course.hours);
        }
      });
      this.state.anticipatedCourses.forEach(course => {
        if (!course.grade) {
          totalNonGradedCredits += parseInt(course.hours);
        }
      });

      var allCredits = totalNonGradedCredits + totalTakenHours;

      console.log(allCredits, totalTakenHours, currentGPA);
      var neededGPA =
        (desiredGPA * allCredits - totalTakenHours * currentGPA) /
        totalNonGradedCredits;
      this.setState({ requiredGPA: neededGPA });
      if (neededGPA > 4) {
        this.setState({ requiredToHighSnack: true });
      } else if (neededGPA < 2) {
        this.setState({ requiredToLowSnack: true });
      }
    } else {
      // not valid
    }
  };

  resetCourses = () => {
    this.setState({
      currentGPA: "No classes entered",
      takenCourses: [],
      currentCourses: [],
      anticipatedCourses: [],
      requiredGPA: "No target GPA entered",
      requiredToHighSnack: false,
      totalCreditHours: 0
    });
  };

  renderCourses = type => {
    var courses = [];
    if (type == "current") {
      courses = this.state.currentCourses;
    } else if (type == "taken") {
      courses = this.state.takenCourses;
    } else {
      courses = this.state.anticipatedCourses;
    }
    return courses.map((course, index) => {
      return (
        <View style={styles.textFieldsContainer}>
          <View style={styles.textFieldContainer}>
            <Text>Credit Hours (required)</Text>
            <TextInput
              style={styles.textInput}
              maxLength={1}
              defaultValue={0}
              onChangeText={text => this.onChangeHours(text, index, type)}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text>Grade (optional)</Text>
            <TextInput
              style={styles.textInput}
              maxLength={2}
              onChangeText={text => this.onChangeGrade(text, index, type)}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text>Name (optional)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.onChangeName(text, index, type)}
            />
          </View>
          <TouchableOpacity onPress={() => this.deleteCourse(index, type)}>
            <Image
              style={{ marginLeft: 10, width: 20, height: 20 }}
              source={minus}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.coursesContainer}>
          <Text style={styles.headerText}>Courses</Text>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={styles.subHeader}>Taken</Text>
            <TouchableOpacity onPress={() => this.addCourse("taken")}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 10
                }}
                source={plus}
              />
            </TouchableOpacity>
          </View>
          {this.state.takenCourses.length == 0 ? (
            <Text>No Taken Courses</Text>
          ) : (
            this.renderCourses("taken")
          )}

          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={styles.subHeader}>Current</Text>
            <TouchableOpacity onPress={() => this.addCourse("current")}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 10
                }}
                source={plus}
              />
            </TouchableOpacity>
          </View>
          {this.state.currentCourses.length == 0 ? (
            <Text>No Current Courses</Text>
          ) : (
            this.renderCourses("current")
          )}
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={styles.subHeader}>Anticipated</Text>
            <TouchableOpacity onPress={() => this.addCourse("anticipated")}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 10
                }}
                source={plus}
              />
            </TouchableOpacity>
          </View>
          {this.state.anticipatedCourses.length == 0 ? (
            <Text>No Anticipated Courses</Text>
          ) : (
            this.renderCourses("anticipated")
          )}
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.headerText}>Summary</Text>
          <Text style={styles.summaryText}>
            {"Current GPA: " +
              (isNaN(this.state.currentGPA) &&
              this.state.currentGPA !== "No classes entered"
                ? "Invalid Entry"
                : this.state.currentGPA)}
          </Text>
          <Text style={styles.summaryText}>Target GPA: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={number => this.calculateTargetGPA(number)}
          />
          <Text style={styles.summaryText}>
            {"Required GPA: " +
              (isNaN(this.state.requiredGPA) &&
              this.state.requiredGPA !== "No target GPA entered"
                ? "Invalid Entry"
                : this.state.requiredGPA)}
          </Text>
        </View>
        <Snackbar
          open={this.state.requiredToHighSnack}
          message="Required GPA is higher than 4.0, Try adding some more credit hours"
          autoHideDuration={4000}
        />
        <Snackbar
          open={this.state.requiredToLowSnack}
          message="Required GPA is lower than 2.0, Try taking few credits"
          autoHideDuration={4000}
        />
        <TouchableOpacity
          onPress={this.resetCourses}
          style={{ position: "absolute", top: 20, right: 40 }}
        >
          <Image style={{ width: 50, height: 50 }} source={refresh} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  coursesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: height,
    width: width / 3,
    marginLeft: 50,
    marginTop: 100
  },
  summaryContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: height,
    width: width / 3,
    marginTop: 100
  },
  headerText: {
    fontFamily: "Avenir-Light",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 50
  },
  subHeader: {
    fontFamily: "Avenir-Light",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  textFieldsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textFieldContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black"
  },
  summaryText: {
    fontFamily: "Avenir-Light",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  }
});

export default Home;
