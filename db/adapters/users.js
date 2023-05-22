async function createUsers(username, password) {
  console.log("populating initial tables");
  try {
    const {
      rows: [users],
    } = await client.query(
      `
        INSERT INTO users(username, password))
        VALUES($1,$2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
      [username, password]
    );
    return { rows };
  } catch (error) {
    throw error;
  }
}
