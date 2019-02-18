const { reduce } = require('bluebird')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const superagent = require('superagent')

const fhirResources = require('data/fhir-resources-stu2')

const getFhirResourceCount = async () =>
  reduce(fhirResources, async (resourceCount, resource, i) => {
    const result = await superagent.get(`http://stu2:4002/baseDstu2/${resource}`)

    if (result.body.total) {
      resourceCount[resource] = result.body.total
    }

    return resourceCount
  }, {})

const generateReport = async () => {
  const fhirResourceCount = await getFhirResourceCount()

  const { stdout } = await exec('find /resources/human')

  return `<div>FHIR Resource Count</div><pre>${JSON.stringify(fhirResourceCount, null, 2)}</pre><br><div>Available File System Data</div><br><div>${stdout.replace(/\n/g, '<br>')}</div>`
}

module.exports = {
  generateReport
}
