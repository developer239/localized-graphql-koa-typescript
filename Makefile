# Change this so that it matches your container name / id
CONTAINER_NAME ?= graphql_koa_typescript

log = @echo "[make] $(1)"

exec = docker exec -it $(CONTAINER_NAME) sh -c $(1)

enter:
	$(call log, "Entering container terminal")
	docker exec -it $(CONTAINER_NAME) sh

node_modules:
	$(call log, "Installing dependencies")
	$(call exec, "rm -rf node_modules")
	$(call exec, "yarn cache clean --force")
	$(call exec, "yarn install")

build:
	$(call log, "Building")
	$(call exec, "yarn build")

dev:
	$(call log, "Starting dev server")
	$(call exec, "yarn dev")

db-migrate:
	$(call log, "Database migration")
	$(call exec, "yarn db:migrate")

db-rollback:
	$(call log, "Database rollback")
	$(call exec, "yarn db:rollback")

db-reset: db-rollback db-migrate

db-seed:
	$(call log, "Database seed")
	$(call exec, "yarn db:seed")

test:
	$(call log, "Running tests")
	$(call exec, "NODE_ENV=test yarn db:rollback")
	$(call exec, "NODE_ENV=test yarn db:migrate")
	$(call exec, "NODE_ENV=test yarn test")

test-coverage:
	$(call log, "Running tests")
	$(call exec, "NODE_ENV=test yarn db:rollback")
	$(call exec, "NODE_ENV=test yarn db:migrate")
	$(call exec, "NODE_ENV=test yarn test:coverage")

rules := \
	enter \
	node_modules \
	build \
	dev \
	db-migrate \
	db-rollback \
	db-reset \
	db-seed \
	test \
	node_modules \
	test-coverage \

.PHONY: $(rules)
