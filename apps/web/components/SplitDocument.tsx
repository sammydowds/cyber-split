import React, { Fragment } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  Link,
  View,
} from "@react-pdf/renderer";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  createActiveSplitWorkoutSchedule,
  DiscoverSplitDeep,
} from "@repo/database";
import { getBodyPartsFromWorkout } from "@/lib/getBodyPartsFromWorkout";
import { estimateTimeOfWorkout } from "@/lib/estimateTimeOfWorkout";
import { getUniqueEquipment } from "@/lib/getUniqueEquipmentFromSplit";
import { getSplitDifficultyLevel } from "@/lib/getDifficultyLevel";

// Helpful: https://gist.github.com/sadikay/d5457c52e7fb2347077f5b0fe5ba9300
Font.register({
  family: "Cutive Mono",
  src: "https://fonts.gstatic.com/s/cutivemono/v5/N5odNRruTwjvCM8y77PhQZ0EAVxt0G0biEntp43Qt6E.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Cutive Mono",
    fontWeight: "bold",
  },
  titleHeader: {
    fontSize: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: "Cutive Mono",
    fontWeight: "bold",
  },
  text: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 14,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Cutive Mono",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Cutive Mono",
  },
  keyWords: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: "justify",
    textDecoration: "underline",
    textTransform: "lowercase",
    fontFamily: "Cutive Mono",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  tip: {
    fontSize: 10,
    marginLeft: 16,
    fontFamily: "Cutive Mono",
  },
  exerciseLine: {
    fontSize: 12,
    marginLeft: 24,
    marginBottom: 4,
    fontFamily: "Cutive Mono",
    fontWeight: "bold",
  },
});

interface SplitDocumentProps {
  split: DiscoverSplitDeep;
}
export const SplitDocument = ({ split }: SplitDocumentProps) => {
  const splitDifficultyRating = getSplitDifficultyLevel({ split });
  const ratingText =
    splitDifficultyRating === 1
      ? "an intermediate"
      : splitDifficultyRating === 2
        ? "an advanced"
        : "a beginner";

  const { schedule } = createActiveSplitWorkoutSchedule({
    split,
    startDate: new Date(),
  });
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>{split.cadence}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: 20,
            marginBottom: 14,
            marginLeft: 12,
            fontFamily: "Cutive Mono",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              gap: 12,
            }}
          >
            {schedule?.map((week, idx) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textDecoration: "underline",
                    }}
                  >
                    Week {idx + 1} {idx === 0 ? "(This week)" : null}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                      fontSize: 12,
                    }}
                  >
                    {week.map((day) => {
                      if (!day.workout) {
                        return (
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Text>
                              {new Date(day.date).toLocaleDateString("en-us")} -{" "}
                            </Text>
                            <Text>Rest</Text>
                          </View>
                        );
                      }
                      return (
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text>
                            {new Date(day.date).toLocaleDateString("en-us")} -{" "}
                          </Text>
                          <Text>Workout {day.workout.letterLabel}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.text}>
          This split is <Text>{ratingText}</Text> level of difficulty. For this
          split you will be working out{" "}
          <Text style={styles.keyWords}>
            {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence]}
          </Text>
          .
        </Text>

        <Text style={styles.text}>
          Perform this split for 4 weeks at minimum. Each workout your goal
          should be to increase the reps or weight you are lifting to
          progressively overload as time goes on. After four weeks, find a new
          split or modify a similar one.
        </Text>

        <Text style={styles.text}>
          Equipment needed: {getUniqueEquipment(split).join(", ")}.
        </Text>

        <View break>
          {split.workouts.map((workout) => {
            return (
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    marginLeft: 12,
                    marginTop: 12,
                    fontFamily: "Cutive Mono",
                    fontWeight: "bold",
                  }}
                >
                  {workout.letterLabel}
                </Text>
                <Text style={styles.text}>
                  This workout will target{" "}
                  {getBodyPartsFromWorkout(workout).join(", ")}. This workout
                  should take about {estimateTimeOfWorkout(workout)} minutes.
                  Perform the following exercises in order.
                </Text>
                {workout.strengthGroups.map((group, idx) => {
                  return (
                    <>
                      <Text style={styles.exerciseLine}>
                        {idx + 1}. {group.name}
                      </Text>
                    </>
                  );
                })}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
