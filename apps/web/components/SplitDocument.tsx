import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  DiscoverSplitDeep,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPES,
} from "@repo/database";
import { getBodyPartsFromWorkout } from "@/lib/getBodyPartsFromWorkout";
import { estimateTimeOfWorkout } from "@/lib/estimateTimeOfWorkout";
import { getUniqueEquipment } from "@/lib/getUniqueEquipmentFromSplit";
import { getSplitDifficultyLevel } from "@/lib/getDifficultyLevel";

// Helpful: https://gist.github.com/sadikay/d5457c52e7fb2347077f5b0fe5ba9300
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
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
    fontFamily: "Roboto",
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
    margin: 12,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
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
  },
  keyWords: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    textDecoration: "underline",
    textTransform: "lowercase",
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
    fontSize: 8,
    marginLeft: 16,
  },
});

interface SplitDocumentProps {
  split: DiscoverSplitDeep;
}
export const SplitDocument = ({ split }: SplitDocumentProps) => {
  const splitDifficultyRating = getSplitDifficultyLevel({ split });
  const ratingText =
    splitDifficultyRating === 1
      ? "INTERMEDIATE"
      : splitDifficultyRating === 2
        ? "ADVANCED"
        : "BEGINNER";
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.titleHeader}>Split</Text>
        <Text style={styles.title}>{split.cadence}</Text>
        <Text style={styles.text}>
          This split is{" "}
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            {ratingText}
          </Text>{" "}
          level of difficulty. For this split you will complete one of the
          workouts{" "}
          <Text style={styles.keyWords}>
            {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence]}
          </Text>
          .{" "}
          {split.workouts.length > 1
            ? `It is your job to rotate between the ${split.workouts.length} workouts below over the course of those days.`
            : "You need to complete the workout below on each of those days you choose to workout."}
        </Text>
        <Text style={styles.text}>
          Equipment needed: {getUniqueEquipment(split).join(", ")}.
        </Text>
        {split.workouts.map((workout) => {
          return (
            <>
              <Text style={styles.titleHeader} break>
                Workout
              </Text>
              <Text style={styles.title}>{workout.letterLabel}</Text>
              <Text style={styles.text}>
                This workout will target{" "}
                {getBodyPartsFromWorkout(workout).join(", ")}. This workout
                should take about {estimateTimeOfWorkout(workout)} minutes.
                Perform the following exercises in order.
              </Text>
              {workout.strengthGroups.map((group) => {
                return (
                  <>
                    {group.sets[0].exercise.exRxLink ? (
                      <Link
                        style={styles.text}
                        src={group.sets[0].exercise.exRxLink}
                      >
                        {group.name}
                      </Link>
                    ) : (
                      <Text style={styles.text}>{group.name}</Text>
                    )}
                    {group.sets[0].exercise.tips.map((tip) => {
                      return <Text style={styles.tip}>• {tip}</Text>;
                    })}
                  </>
                );
              })}
            </>
          );
        })}
      </Page>
    </Document>
  );
};
