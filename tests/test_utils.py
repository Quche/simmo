from simmo.utils import taux_mensuel

def test_taux_mensuel():
    assert taux_mensuel(1.2) == 0.0995

def test_taux_mensuel_0():
    assert taux_mensuel(0) == 0
