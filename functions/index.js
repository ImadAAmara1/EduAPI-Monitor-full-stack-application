const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// POST - Sauvegarder une métrique
exports.saveMetric = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { query, category, responseTime, resultsCount } = req.body;

      const docRef = await db.collection('search_metrics').add({
        query,
        category,
        responseTime,
        resultsCount,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(201).json({
        success: true,
        id: docRef.id
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// GET - Récupérer les métriques
exports.getMetrics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const limit = parseInt(req.query.limit) || 50;

      const snapshot = await db.collection('search_metrics')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      const metrics = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        metrics.push({
          id: doc.id,
          query: data.query,
          category: data.category,
          response_time: data.responseTime,
          results_count: data.resultsCount,
          timestamp: data.timestamp?.toDate()
        });
      });

      res.json({
        success: true,
        count: metrics.length,
        data: metrics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// DELETE - Supprimer toutes les métriques
exports.clearMetrics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const snapshot = await db.collection('search_metrics').get();
      const batch = db.batch();

      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      res.json({
        success: true,
        message: 'Toutes les métriques ont été supprimées'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});
