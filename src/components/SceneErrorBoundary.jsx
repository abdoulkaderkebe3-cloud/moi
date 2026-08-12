import { Component } from 'react';

/**
 * Isole la scène 3D du reste de la page.
 *
 * Sans ça, la moindre erreur levée pendant le rendu du Canvas (contexte WebGL
 * refusé ou perdu, pilote graphique capricieux, modèle illisible) remonte
 * jusqu'à la racine : React démonte alors tout l'arbre et le site entier
 * devient blanc. Une voiture décorative ne doit jamais pouvoir faire ça.
 */
export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('Scène 3D désactivée après une erreur :', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
