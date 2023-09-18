SELECT user_report.id,
    incident_type.incident,
    user_report.date,
    user_report.time,
    user_report.location,
    user_report.description,
    ARRAY_AGG(image.image_string) AS image_array
FROM user_report
    LEFT JOIN image ON user_report.id = image.user_report_id
    LEFT JOIN incident_type ON user_report.incident_id = incident_type.id
WHERE user_report.user_id = '1'
    AND user_report.id = 'your_id_value'
GROUP BY user_report.id,
    incident_type.incident,
    user_report.date,
    user_report.time,
    user_report.location,
    user_report.description
LIMIT 1;