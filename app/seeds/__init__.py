from flask.cli import AppGroup

from app.seeds.likes import seeded_likes, undo_like
from .users import seed_users, undo_users
from .events import seeded_events, undo_events
from .reviews import seeded_reviews, undo_reviews
from .likes import seeded_likes, undo_like
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seeded_events()
    seeded_reviews()
    seeded_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    undo_reviews()
    undo_like()
    # Add other undo functions here
