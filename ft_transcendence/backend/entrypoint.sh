#!/bin/bash
set -e

# 환경 변수를 설정하여 Django가 사용할 설정 파일 지정
export DJANGO_SETTINGS_MODULE=myproject.settings

# 데이터베이스가 시작될 때까지 기다립니다.
while ! nc -z db 5432; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Django 프로젝트에서 필요한 마이그레이션 수행
python manage.py migrate

# 정적 파일 수집 (선택 사항)
python manage.py collectstatic --noinput

# Django 개발 서버 실행
exec "$@"
