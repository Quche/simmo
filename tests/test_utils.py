from simmo.utils import calcul_taux_mensuel
from simmo.generic.quantities import calcul_taux_endettement, calcul_mensualite

def test_taux_mensuel():
    assert round(calcul_taux_mensuel(1.2),4) == 0.0995
    assert calcul_taux_mensuel(0) == 0

def test_calcul_taux_endettement():
    assert calcul_taux_endettement(1000, 1000) == 1
    assert calcul_taux_endettement(1000, 500) == 0.5
    assert calcul_taux_endettement(1000, 0) == 0

def test_calcul_mensualite():
    assert calcul_mensualite(1000, 0) == 0
    assert calcul_mensualite(1000, 0.10) == 100
    assert calcul_mensualite(1000, 1) == 1000
