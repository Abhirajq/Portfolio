"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Representative training curve. This is illustrative shape data, not an
// exported run — the surrounding card labels it as such.
const trainingData = [
  { epoch: 1, loss: 0.85, accuracy: 0.55 },
  { epoch: 5, loss: 0.62, accuracy: 0.72 },
  { epoch: 10, loss: 0.45, accuracy: 0.81 },
  { epoch: 15, loss: 0.31, accuracy: 0.86 },
  { epoch: 20, loss: 0.22, accuracy: 0.89 },
  { epoch: 25, loss: 0.15, accuracy: 0.91 },
];

export default function TrainingChart() {
  return (
    <div className="h-56 w-full opacity-90 pr-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trainingData} margin={{ top: 5, right: 5, bottom: 18, left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="epoch"
            stroke="rgba(255,255,255,0.4)"
            fontSize={10}
            label={{
              value: "Epoch",
              position: "insideBottom",
              offset: -8,
              fill: "rgba(255,255,255,0.4)",
              fontSize: 10,
            }}
          />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
          <Tooltip
            contentStyle={{
              background: "rgba(3, 7, 18, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              fontSize: "11px",
              color: "#F8FAFC",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }} iconSize={8} />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#8B5CF6"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Loss"
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#06B6D4"
            strokeWidth={2}
            name="Accuracy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
