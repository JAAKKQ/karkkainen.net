pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps {

                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/var/www/karkkainen.net', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'karkkainen.net/dist/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
// Tranfer files to webservers via ssh after building.