module.exports = (statuses, client) => {
  if (statuses.size !== 0) {
    let y = 0

    let status = statuses.allValues()
    const f = async () => {

      if (!status[y]) { y = 0 }
      setTimeout(() => {
        status[y].activity.name = status[y].activity.name.includes('$') ? (await client.functionManager.interpreter(client, {}, [], { code: status[y].activity.name }, client.db, true))?.code : status[y].activity.name;
        client.user.setPresence({
          status: status[y].status,
          activities: Array.isArray(status[y].activity) ? status[y].activity : [status[y].activity],
          afk: status[y].afk
        })

        y++
        f()

      }, (status[y]?.time || 12) * 1000)

    }
    f()
  }
}