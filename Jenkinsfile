pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
                sh 'rm -rf /var/www/karkkainen.net'
                sh 'mkdir -p /var/www/karkkainen.net'
                sh 'cp -r dist/* /var/www/karkkainen.net'
            }
        }
    }
}
