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
                    // CHANGE THIS TO THE WEBSITE DOMAIN!
                    def domain = 'karkkainen.net'
                    //____________________________________

                    // ADD THE SERVERS!
                    def devServers = [
                            'HEL-WWW-DEV-01'
                    ]
                    def prodServers = [
                            'HEL-WWW-PROD-01'
                    ]
                    //____________________________________

                    if(env.BRANCH_NAME == 'main'){
                        prodServers.each{ server ->
                            deployProduction(server, domain)
                        }   
                    } else {
                        devServers.each{ server ->
                            deployDevelopment(server, domain)
                        }   
                    }
                }
            }
        }
    }
}

def deployDevelopment(server, domain){
    stage("Deploying to ${server}"){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '', 
                        execCommand: "find . -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +", 
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
                verbose: false
            )
        ]
    }
}

def deployProduction(server, domain){
    stage("Deploying to ${server}"){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '', 
                        execCommand: "find . -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +", 
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