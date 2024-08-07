# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jinhyeop <jinhyeop@student.42seoul.kr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/05/29 16:11:40 by jinhyeop          #+#    #+#              #
#    Updated: 2024/07/24 17:39:17 by jinhyeop         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Makefile
NAME = inception

# Docker Compose 실행 명령어
DOCKER_COMPOSE = docker-compose -f docker-compose.yml

# 프로젝트 실행
all: up

# Docker Compose로 컨테이너 시작
up:
	$(DOCKER_COMPOSE) up --build -d

# Docker Compose로 컨테이너 중지 및 제거
down:
	$(DOCKER_COMPOSE) down

# Docker 볼륨 및 네트워크 제거
clean: down
	docker volume rm -f $$(docker volume ls -q)
	docker network rm $$(docker network ls -q | grep $(NAME)_)

# 전체 클린 및 재빌드
fclean: clean
	docker rmi -f $$(docker images -q)

# 다시 빌드하고 시작
re: fclean all

.PHONY: all up down clean fclean re
