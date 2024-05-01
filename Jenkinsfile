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
                script {

                    def domain = 'karkkainen.net'
                    def devServers = [
                            'HEL-WWW-DEV-01'
                        ]
                    def prodServers = [
                            'HEL-WWW-PROD-01',
                            'SGP-WWW-PROD-01'
                        ]

                    if(env.BRANCH_NAME == 'main'){
                        devServers.each{ server ->
                            echo server
                        }
                        deployProduction('HEL-WWW-DEV-01', 'karkkainen.net')
                    } else {
                        deployDevelopment('HEL-WWW-DEV-01', 'karkkainen.net')
                    }
                }
            }
        }
    }
}

def deployDevelopment(server, domain){
    stage('Deploying to Development'){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: true,
                        excludes: '', 
                        execCommand: '', 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        removePrefix: 'dist/', 
                        sourceFiles: 'dist/**'
                    )
                ], 
                usePromotionTimestamp: false, 
                useWorkspaceInPromotion: false, 
                verbose: true
            )
        ]
    }
}

def deployProduction(server, domain){
    stage('Deploying to Production'){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: true,
                        excludes: '', 
                        execCommand: '', 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        removePrefix: 'dist/', 
                        sourceFiles: 'dist/**'
                    )
                ], 
                usePromotionTimestamp: false, 
                useWorkspaceInPromotion: false, 
                verbose: true
            )
        ]
    }
}