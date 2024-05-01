def devServers = [
    [
        'HEL-WWW-DEV-01'
    ]
]
def prodServers = [
    [
        'HEL-WWW-PROD-01',
        'SGP-WWW-PROD-01'
    ]
]
def domain = 'karkkainen.net'



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
                    if(env.BRANCH_NAME == 'main'){
                        deployProduction()
                    } else {
                        deployDevelopment()
                    }
                }
            }
        }
    }
}

def deployDevelopment(){
    stage('Deploying to Development'){
        devServers.each { server ->
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
}

def deployProduction(){
    stage('Deploying to Production'){
        script {
            prodServers.each { server ->
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
    }
}