SELECT u.user_uuid,
    u.user_name,
    u.email,
    json_agg(
        jsonb_build_object(
            'emerg_contact_uuid',
            ec.emerg_contact_uuid,
            'emerg_contact_email',
            uc.email
        )
    ) AS emerg_contacts
FROM "user" AS u
    LEFT JOIN emerg_contact AS ec ON u.user_uuid = ec.current_user_uuid
    LEFT JOIN "user" AS uc ON ec.emerg_contact_uuid = uc.user_uuid
GROUP BY u.user_uuid,
    u.user_name,
    u.email;
