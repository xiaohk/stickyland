conda activate sticky
bump2version patch
python3 -m build
python3 -m twine upload --skip-existing dist/*
