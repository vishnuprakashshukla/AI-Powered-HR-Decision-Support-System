const results = [];

for (const item of items) {

  const data = item.json;

  const scoreMap = {
    "Strongly agree": 5,
    "Agree": 4,
    "Neutral": 3,
    "Disagree": 2,
    "Strongly disagree": 1,

    "Excellent": 5,
    "Good": 4,
    "Average": 3,
    "Poor": 2,

    "Highly Competitive": 5,
    "Competitive": 4,
    "Average": 3,
    "Below Average": 2,

    "Very Satisfied": 5,
    "Satisfied": 4,
    "Neutral": 3,
    "Unsatisfied": 2,

    "Definitely": 5,
    "Probably": 4,
    "Not Sure": 3,
    "Probably Not": 2,
    "No": 1
  };

  let totalScore = 0;
  let count = 0;

  Object.keys(data).forEach(key => {

    const value = String(data[key]).trim();

    if (scoreMap[value] !== undefined) {
      totalScore += scoreMap[value];
      count++;
    }

  });

  const avgScore = count > 0 ? totalScore / count : 0;

  let sentiment = "";
  let attritionRisk = "";
  let recommendation = "";
  let summary = "";

  if (avgScore >= 4.2) {

    sentiment = "Highly Positive";
    attritionRisk = "Low";

    recommendation =
      "Employee engagement is strong. Continue recognition programs, career development opportunities and leadership engagement.";

    summary =
      "Overall employee sentiment is highly positive with low attrition risk.";

  } else if (avgScore >= 3.5) {

    sentiment = "Positive";
    attritionRisk = "Moderate";

    recommendation =
      "Monitor employee satisfaction regularly and strengthen growth opportunities.";

    summary =
      "Employees are generally satisfied but improvements can further reduce attrition.";

  } else if (avgScore >= 2.5) {

    sentiment = "Neutral";

    attritionRisk = "High";

    recommendation =
      "Conduct employee feedback sessions and address workplace concerns immediately.";

    summary =
      "Employee sentiment is mixed and may lead to higher turnover if not addressed.";

  } else {

    sentiment = "Negative";

    attritionRisk = "Very High";

    recommendation =
      "Urgent HR intervention required. Review leadership practices, compensation, career growth and workplace culture.";

    summary =
      "Employee dissatisfaction is significant and attrition risk is extremely high.";

  }

  results.push({
    json: {
      Timestamp: data.Timestamp,
      Sentiment: sentiment,
      Attrition_Risk: attritionRisk,
      HR_Recommendation: recommendation,
      Executive_Summary: summary
    }
  });
}

return results;
