pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install',
                    sh 'npm run build'
                }
            }
        }
    }
}