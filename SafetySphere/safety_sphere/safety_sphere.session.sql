select incident_type.incident,
    user_report.date,
    user_report.time,
    user_report.location,
    user_report.latitude,
    user_report.longitude,
    user_report.description,
    user_report.images
from user_report
    join incident_type on incident_type.id = user_report.incident_id