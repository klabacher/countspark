INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES
(
    '00000000-0000-0000-0000-000000000000',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- UUID do User 1
    'authenticated',
    'authenticated',
    'joao@countspark.com',
    '$2a$10$E1P3DyRpH74nqtB5TrtlQOkUKXl2er1yBhBiO6CMfi2ZlDux5T012', -- teste1teste Hash fake, em dev local o Supabase pode ignorar ou você usa o link de login
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"João Dev"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
),
(
    '00000000-0000-0000-0000-000000000000',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', -- UUID do User 2
    'authenticated',
    'authenticated',
    'maria@countspark.com',
    '$2a$10$E1P3DyRpH74nqtB5TrtlQOkUKXl2er1yBhBiO6CMfi2ZlDux5T012', -- teste1teste Hash fake, em dev local o Supabase pode ignorar ou você usa o link de login
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Maria Designer"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, name, role)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'João Dev', 'admin'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Maria Designer', 'user')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.counters (user_id, title, status, settings)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Lançamento do SaaS',
    'active',
    '{
        "Timing": { "endDate": 1767225600000, "startDate": 1704067200000 },
        "Texts": {
            "title": "Lançamento Oficial",
            "footer": "CountSpark Inc",
            "buttons": [{"link": null, "label": "Inscrever-se", "action": "link", "shownOnlyWhen": "beforeStart"}],
            "calltoAction": "Não perca!",
            "description": "O dia que tudo muda."
        },
        "Styles": {
            "customTheme": {
                "textColor": "#ffffff",
                "accentColor": "#3b82f6",
                "buttonColor": "#2563eb",
                "fontFamily": "Inter, sans-serif",
                "backgroundColor": "#0f172a",
                "buttonTextColor": "#ffffff",
                "showBackgroundImage": true
            },
            "selectedTheme": "custom",
            "backgroundImageUrl": "https://picsum.photos/1920/1080",
            "backgroundImageBlur": 4,
            "backgroundImageOpacity": 0.4
        },
        "Settings": {
            "timezone": "America/Sao_Paulo",
            "digitsShown": "days",
            "showSeconds": true,
            "digitSeparator": ":",
            "showTimezone": true,
            "animationDuration": 0,
            "digitsShowLeadingZeros": true
        }
    }'::jsonb
);

INSERT INTO public.counters (user_id, title, status, settings)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Ano Novo 2026',
    'active',
    '{
        "Timing": { "endDate": 1798761600000, "startDate": 1704067200000 },
        "Texts": {
            "title": "Feliz 2026",
            "footer": "Klabacher",
            "buttons": [],
            "calltoAction": "Contagem regressiva",
            "description": "Falta pouco!"
        },
        "Styles": {
            "selectedTheme": "dark",
            "backgroundImageUrl": "",
            "backgroundImageBlur": 0,
            "backgroundImageOpacity": 0.2
        },
        "Settings": {
            "timezone": "UTC",
            "digitsShown": "seconds",
            "showSeconds": true,
            "digitSeparator": ":",
            "showTimezone": false,
            "animationDuration": 0,
            "digitsShowLeadingZeros": true
        }
    }'::jsonb
);

INSERT INTO public.counters (user_id, title, status, settings)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Casamento da Ana',
    'active',
    '{
        "Timing": { "endDate": 1750000000000, "startDate": 1700000000000 },
        "Texts": { "title": "Casamento", "description": "O grande dia", "calltoAction": "Confirme presença", "buttons": [], "footer": "Ana & Beto" },
        "Styles": { "selectedTheme": "light", "backgroundImageUrl": "", "backgroundImageBlur": 0, "backgroundImageOpacity": 0 },
        "Settings": { "timezone": "Europe/Paris", "digitsShown": "days", "showSeconds": false, "digitSeparator": "-", "showTimezone": false, "animationDuration": 0, "digitsShowLeadingZeros": false }
    }'::jsonb
);

INSERT INTO public.counters (user_id, title, status, settings)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Hackathon',
    'busy',
    '{
        "Timing": { "endDate": 1740000000000, "startDate": 1730000000000 },
        "Texts": { "title": "Hackathon 2025", "description": "Codando", "calltoAction": "Go!", "buttons": [], "footer": "TechTeam" },
        "Styles": { "selectedTheme": "dark", "backgroundImageUrl": "", "backgroundImageBlur": 0, "backgroundImageOpacity": 0 },
        "Settings": { "timezone": "America/New_York", "digitsShown": "hours", "showSeconds": true, "digitSeparator": ":", "showTimezone": true, "animationDuration": 0, "digitsShowLeadingZeros": true }
    }'::jsonb
);
