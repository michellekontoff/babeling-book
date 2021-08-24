from flask.cli import AppGroup
from .users import seed_users, undo_users
from .languages import seed_languages, undo_languages
from .posts import seed_posts, undo_posts
from .speakers import seed_speakers, undo_speakers
from .learners import seed_learners, undo_learners

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_languages()
    seed_posts()
    seed_learners()
    seed_speakers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_languages()
    undo_posts()
    undo_learners()
    undo_speakers()
    # Add other undo functions here
