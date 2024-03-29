"""Initial migration

Revision ID: ce3cee57bdd9
Revises: 
Create Date: 2024-03-25 20:29:02.174949

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce3cee57bdd9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('isbn', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('reading_status', sa.String(), nullable=True),
    sa.Column('current_page', sa.Integer(), nullable=True),
    sa.Column('total_pages', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('books')
    # ### end Alembic commands ###