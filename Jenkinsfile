pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
                sh 'cp -r dist/ /var/www/karkkainen.net'
            }
        }
    }
}