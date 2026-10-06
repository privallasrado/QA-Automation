pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.62.1-noble'
    }
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('UI tests') {
      steps {
        sh 'npm run test:e2e'
      }
    }

    stage('API tests') {
      steps {
        sh 'npm run test:api'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report/ui',
        reportFiles: 'index.html',
        reportName: 'Playwright UI Report'
      ])
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report/api',
        reportFiles: 'index.html',
        reportName: 'Playwright API Report'
      ])
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}