import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import styles from './CircularProgressStyles';

interface CircularProgressProps {
  strokeWidth: number;
  progress: number; // Progress as a percentage (can go over 100%)
  calories: number; // Number of calories
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  strokeWidth,
  progress,
  calories,
}) => {
  let [size, setSize] = useState<number>(Number);

  const onLayout = (event: LayoutChangeEvent) => {
    size = Math.min(
      event.nativeEvent.layout.width,
      event.nativeEvent.layout.height,
    );
    if (size === null) {
      size = 0;
    }
    setSize(size);
  };

  const windowDim = Dimensions.get('window').height;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the base progress and the extra progress for values over 100%
  const baseProgress = progress > 100 ? 100 : progress;
  const extraProgress = progress > 100 ? progress - 100 : 0;

  // Calculate the stroke offsets for the base and extra progress
  const baseStrokeDashoffset =
    circumference - (circumference * baseProgress) / 100;

  // Generate an array of colors for the gradient effect
  const gradientColors = [
    '#4CAF50', // Starting color for progress within the limit
    '#FF0000', // Intermediate color
    '#FF6F00', // Darker color for exceeding the limit
  ];

  // Determine the number of extra circles needed for the gradient effect
  const extraCircles = Math.ceil(extraProgress / 100);

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={progress > 100 ? gradientColors[1] : gradientColors[0]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={baseStrokeDashoffset}
          strokeLinecap="round"
        />
        {progress > 100 &&
          Array.from({length: extraCircles}).map((_, index) => {
            const offset = circumference * (index + 1);
            const color =
              gradientColors[Math.min(index + 2, gradientColors.length - 1)];
            const currentExtraProgress = extraProgress - 100 * index;
            const currentExtraStrokeDashoffset =
              circumference - (circumference * currentExtraProgress) / 100;

            return (
              <Circle
                key={index}
                stroke={color}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={-offset + currentExtraStrokeDashoffset}
                strokeLinecap="round"
              />
            );
          })}
      </Svg>
      <View style={styles.textView}>
        <Text style={[styles.text, {fontSize: size / 5}]}>{`${calories}`}</Text>
        <Text style={[styles.text, {fontSize: size / 8}]}>kcal</Text>
      </View>
    </SafeAreaView>
  );
};

export default CircularProgress;
