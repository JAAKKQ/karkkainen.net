pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    npm install
                }
            }
        }
    }
}