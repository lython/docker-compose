db.auth("root", "root-password")
db = db.getSiblingDB('cloud')
db.createUser(
    {
        user: "cloud",
        pwd: "cloud-password",
        roles: [
            { role: "readWrite", db: "cloud"}
        ]
    }
)
db.createUser(
    {
        user: "guest",
        pwd: "guest-password",
        roles: [
            { role: "read", db: "cloud"}
        ]
    }
)