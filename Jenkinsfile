pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-manager"
        DOCKER_USER = "your-dockerhub-username"
        CONTAINER_NAME = "task-manager"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/anusree-ux/task-manager.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "No tests defined yet"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh """
                docker run -d -p 3000:3000 \
                --name $CONTAINER_NAME \
                --restart unless-stopped \
                $IMAGE_NAME
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful 🚀'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
    }
}
