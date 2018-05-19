ENVFILE=utils/testenvironment

run-on-jenkins:
		./scripts/run-e2e-tests.sh

build:
		docker build -t aszegedi/protractor .

run:
		docker run -it \
            --privileged \
            --rm \
            --net=host \
            --name protractor-e2e-runner \
            --env-file $(ENVFILE) \
            -v $(PWD):/protractor/project \
            -v /dev/shm:/dev/shm \
            aszegedi/protractor yarn test
            RESULT=$?

.PHONY:
		build
