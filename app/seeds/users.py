from app.models import db, User
from faker import Faker


# Adds a demo user, you can add other users here if you want
def seed_users():
    fake = Faker()



    demo = User(
        username='Demo', email='demo@aa.io', bio='hello', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    
    for i in range(0, 6):
        name = fake.name()
        bio = fake.sentence()
        i = User(username=name[0:40], bio=bio[0:250], email=fake.email(), password='yeppers')

        db.session.add(i)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
