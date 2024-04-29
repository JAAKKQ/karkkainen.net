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
                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'rm -rf /var/www/karkkainen.net', execTimeout: 10, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'echo "Hello"', execTimeout: 5000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/var/karkkainen.net', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '/home/jenkins-agent/jenkins/workspace/karkkainen.net/dist/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
// Tranfer files to webservers via ssh after building.