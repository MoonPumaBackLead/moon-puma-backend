команда запуска со сборкой(после обновления ветки/первый запуск) - docker compose -f docker-compose-dev.yaml  up -d --build
команда перезапуска без сборки - docker compose -f docker-compose-dev.yaml  up -d --build
остановить контейнеры docker compose -f docker-compose-dev.yaml  stop
удалить контейнеры docker rm -f moon-puma-api-container moon-puma-db-container
удалить volume(удалит хранилище бд для контейнера постгрес) - docker volume rm moon-puma-db-volume 